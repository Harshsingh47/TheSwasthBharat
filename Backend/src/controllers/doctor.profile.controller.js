const {
  updateDoctorProfileService,
  getDoctorProfileService,
} = require("../services/doctor.profile.service");

// UPDATE DOCTOR PROFILE
exports.updateDoctorProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const profile = await updateDoctorProfileService(userId, req.body);

    res.json({
      message: "Doctor profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "Doctor profile not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to update profile" });
  }
};

// GET DOCTOR PROFILE
exports.getDoctorProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const profile = await getDoctorProfileService(userId);

    res.json({
      profile,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "Doctor profile not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to fetch profile" });
  }
};