const prisma = require("../config/prisma");

// UPDATE PATIENT PROFILE
exports.updatePatientProfileService = async (userId, data) => {
  const {
    age,
    gender,
    bloodGroup,
    location,
    allergies,
    existingConditions,
    emergencyContactName,
    emergencyContactPhone,
    volunteerInterest,
    profilePicture,
  } = data;

  const existingProfile = await prisma.patientProfile.findUnique({
    where: { userId },
  });

  if (!existingProfile) {
    throw new Error("Patient profile not found");
  }

  if (profilePicture) {
    const { uploadFileToCDN } = require("./upload.service");
    const cdnUrl = await uploadFileToCDN(profilePicture);
    await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: cdnUrl }
    });
  }

  const updatedProfile = await prisma.patientProfile.update({
    where: { userId },
    data: {
      age: age !== undefined ? Number(age) : undefined,
      gender,
      bloodGroup,
      location,
      allergies,
      existingConditions,
      emergencyContactName,
      emergencyContactPhone,
      volunteerInterest:
        volunteerInterest !== undefined ? Boolean(volunteerInterest) : undefined,
    },
  });

  return updatedProfile;
};

// GET PATIENT PROFILE
exports.getPatientProfileService = async (userId) => {
  const profile = await prisma.patientProfile.findUnique({
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
    throw new Error("Patient profile not found");
  }

  return profile;
};