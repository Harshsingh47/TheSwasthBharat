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

// GET MY APPOINTMENTS (PATIENT)
exports.getMyAppointmentsService = async (userId) => {
  const appointments = await prisma.appointment.findMany({
    where: { patientId: userId },
    include: {
      doctor: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return appointments;
};