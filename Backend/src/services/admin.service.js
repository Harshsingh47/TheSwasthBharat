const prisma = require("../config/prisma");

exports.getAdminStatsService = async () => {
  const [totalPatients, totalDoctors, totalAppointments] = await Promise.all([
    prisma.user.count({ where: { role: "PATIENT" } }),
    prisma.user.count({ where: { role: "DOCTOR" } }),
    prisma.appointment.count()
  ]);

  return { totalPatients, totalDoctors, totalAppointments };
};

exports.getUnverifiedDoctorsService = async () => {
  return await prisma.doctorProfile.findMany({
    where: { isVerified: false },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
          avatarUrl: true
        }
      }
    }
  });
};

exports.verifyDoctorService = async (doctorId) => {
  return await prisma.doctorProfile.update({
    where: { id: doctorId },
    data: { isVerified: true }
  });
};

exports.rejectDoctorService = async (doctorId) => {
  const profile = await prisma.doctorProfile.findUnique({
    where: { id: doctorId }
  });
  if (!profile) throw new Error("Doctor profile not found");
  
  return await prisma.$transaction([
    prisma.doctorProfile.delete({ where: { id: doctorId } }),
    prisma.user.delete({ where: { id: profile.userId } })
  ]);
};
