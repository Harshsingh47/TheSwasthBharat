const prisma = require("../config/prisma");

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
  } = data;

  const existingProfile = await prisma.doctorProfile.findUnique({
    where: { userId },
  });

  if (!existingProfile) {
    throw new Error("Doctor profile not found");
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
      degreeCertificateUrl,
      idProofUrl,
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
        },
      },
    },
  });

  if (!profile) {
    throw new Error("Doctor profile not found");
  }

  return profile;
};