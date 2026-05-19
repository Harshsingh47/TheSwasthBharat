const prisma = require("../config/prisma");

// CREATE APPOINTMENT
exports.createAppointmentService = async (userId, data) => {
  const { doctorId, date, reason } = data;

  if (!doctorId || !date) {
    throw new Error("Doctor and date are required");
  }

  // check doctor exists
  const doctor = await prisma.doctorProfile.findUnique({
    where: { id: doctorId },
  });
  if (!doctor || !doctor.isVerified) {
    throw new Error("Doctor not available");
  }

  const appointmentDate = new Date(date);

  // prevent duplicate booking same time
  const existing = await prisma.appointment.findFirst({
    where: {
      doctorId,
      date: appointmentDate,
    },
  });

  if (existing) {
    throw new Error("Slot already booked");
  }

  const appointment = await prisma.appointment.create({
    data: {
      patientId: userId,
      doctorId,
      date: appointmentDate,
      reason,
    },
  });

  return appointment;
};

// GET MY APPOINTMENTS (PATIENT OR DOCTOR)
exports.getMyAppointmentsService = async (userId, role) => {
  if (role === "DOCTOR") {
    const doctorProfile = await prisma.doctorProfile.findUnique({
      where: { userId },
    });
    
    if (!doctorProfile) return [];

    return await prisma.appointment.findMany({
      where: { doctorId: doctorProfile.id },
      include: {
        patient: {
          select: {
            name: true,
            email: true,
            phone: true,
            avatarUrl: true
          },
        },
      },
      orderBy: { date: "asc" },
    });
  }

  // PATIENT ROLE
  return await prisma.appointment.findMany({
    where: { patientId: userId },
    include: {
      doctor: {
        include: {
          user: {
            select: { name: true, avatarUrl: true },
          },
        },
      },
    },
    orderBy: { date: "asc" },
  });
};