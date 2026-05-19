const prisma = require("../config/prisma");

function convertTo24Hour(time12h) {
  try {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier && modifier.toUpperCase() === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours.toString().padStart(2, '0')}:${minutes || '00'}`;
  } catch (error) {
    return "09:00"; // fallback
  }
}

// UPDATE DOCTOR PROFILE
exports.updateDoctorProfileService = async (userId, data) => {
  const {
    specialty,
    experience,
    location,
    bio,
    consultationFee,
    qualification,
    university,
    registrationNumber,
    hospitalAffiliation,
    degreeCertificateUrl,
    idProofUrl,
    languagesSpoken,
    consultationMode,
    profilePicture,
    workingHours,
    availability,
  } = data;

  const existingProfile = await prisma.doctorProfile.findUnique({
    where: { userId },
  });

  if (!existingProfile) {
    throw new Error("Doctor profile not found");
  }

  // Update User avatar if profilePicture is present
  if (profilePicture) {
    const { uploadFileToCDN } = require("./upload.service");
    const cdnUrl = await uploadFileToCDN(profilePicture);
    await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: cdnUrl }
    });
  }

  // Parse and update Availability if provided
  if (workingHours && availability) {
    let startTime = "09:00";
    let endTime = "17:00";
    
    try {
      const parts = workingHours.split('-');
      if (parts.length === 2) {
        startTime = convertTo24Hour(parts[0].trim());
        endTime = convertTo24Hour(parts[1].trim());
      }
    } catch(e) {}

    let days = [];
    const avail = availability.toLowerCase();
    if (avail.includes('mon - fri') || avail.includes('monday - friday')) {
      days = [1, 2, 3, 4, 5];
    } else if (avail.includes('mon - sat') || avail.includes('monday - saturday')) {
      days = [1, 2, 3, 4, 5, 6];
    } else if (avail.includes('weekends')) {
      days = [0, 6];
    } else if (avail.includes('everyday')) {
      days = [0, 1, 2, 3, 4, 5, 6];
    } else if (avail.includes('mon, wed, fri')) {
      days = [1, 3, 5];
    } else if (avail.includes('tue, thu, sat')) {
      days = [2, 4, 6];
    }

    if (days.length > 0) {
      // Delete old availabilities
      await prisma.doctorAvailability.deleteMany({
        where: { doctorId: existingProfile.id }
      });

      // Create new availabilities
      const availabilityData = days.map(day => ({
        doctorId: existingProfile.id,
        dayOfWeek: day,
        startTime,
        endTime,
        slotDuration: 30
      }));

      await prisma.doctorAvailability.createMany({
        data: availabilityData
      });
    }
  }

  const { uploadFileToCDN } = require("./upload.service");
  let degreeUrl = degreeCertificateUrl;
  let idProof = idProofUrl;

  if (degreeCertificateUrl) {
    degreeUrl = await uploadFileToCDN(degreeCertificateUrl);
  }
  if (idProofUrl) {
    idProof = await uploadFileToCDN(idProofUrl);
  }

  const updatedProfile = await prisma.doctorProfile.update({
    where: { userId },
    data: {
      specialty,
      experience: experience !== undefined ? Number(experience) : undefined,
      location,
      bio,
      consultationFee:
        consultationFee !== undefined ? Number(consultationFee) : undefined,
      qualification,
      university,
      registrationNumber,
      hospitalAffiliation,
      degreeCertificateUrl: degreeUrl,
      idProofUrl: idProof,
      languagesSpoken,
      consultationMode,
    },
  });

  return updatedProfile;
};

// GET DOCTOR PROFILE
exports.getDoctorProfileService = async (userId) => {
  const profile = await prisma.doctorProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (!profile) {
    throw new Error("Doctor profile not found");
  }

  return profile;
};

exports.getDoctorsListService = async (query) => {
  const {
    search,
    location,
    minRating,
    page = 1,
    limit = 10,
  } = query;

  const skip = (page - 1) * limit;

  const where = {
    isVerified: true, // only verified doctors
  };

  // search by name or specialty
  if (search) {
    where.OR = [
      {
        user: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        specialty: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (location) {
    where.location = {
      contains: location,
      mode: "insensitive",
    };
  }

  if (minRating) {
    where.rating = {
      gte: Number(minRating),
    };
  }

  const doctors = await prisma.doctorProfile.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
    skip: Number(skip),
    take: Number(limit),
    orderBy: {
      rating: "desc",
    },
  });

  const total = await prisma.doctorProfile.count({ where });

  return {
    data: doctors,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

exports.getDoctorDetailsService = async (doctorId) => {
  const doctor = await prisma.doctorProfile.findUnique({
    where: { id: doctorId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  if (!doctor.isVerified) {
    throw new Error("Doctor not available");
  }

  return doctor;
};
exports.setDoctorAvailabilityService = async (userId, data) => {
  const { dayOfWeek, startTime, endTime, slotDuration } = data;

  // find doctor profile
  const doctor = await prisma.doctorProfile.findUnique({
    where: { userId },
  });

  if (!doctor) throw new Error("Doctor not found");

  const availability = await prisma.doctorAvailability.create({
    data: {
      doctorId: doctor.id,
      dayOfWeek,
      startTime,
      endTime,
      slotDuration,
    },
  });

  return availability;
};

function generateSlots(startTime, endTime, duration) {
  const slots = [];

  let start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);

  while (start < end) {
    const slotEnd = new Date(start.getTime() + duration * 60000);

    slots.push({
      start: start.toTimeString().slice(0, 5),
      end: slotEnd.toTimeString().slice(0, 5),
    });

    start = slotEnd;
  }

  return slots;
}

exports.getDoctorSlotsService = async (doctorId, date) => {
  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.getDay();

  const availabilities = await prisma.doctorAvailability.findMany({
    where: {
      doctorId,
      dayOfWeek,
    },
  });

  if (!availabilities.length) return [];

  let allSlots = [];

  for (const availability of availabilities) {
    const slots = generateSlots(
      availability.startTime,
      availability.endTime,
      availability.slotDuration
    );
    allSlots = [...allSlots, ...slots];
  }

  // Remove duplicates (important)
  const uniqueSlots = Array.from(
    new Map(allSlots.map((s) => [s.start, s])).values()
  );

  // Get booked appointments
  const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
console.log("👉 doctorId:", doctorId);
console.log("👉 selectedDate:", selectedDate);
console.log("👉 dayOfWeek:", dayOfWeek);
console.log("👉 availabilities:", availabilities);
console.log("👉 allSlots:", allSlots);
console.log("👉 appointments:", appointments);
  const bookedTimes = appointments.map((appt) =>
    new Date(appt.date).toISOString().slice(11, 16)
  );

  return uniqueSlots.filter((slot) => !bookedTimes.includes(slot.start));
};