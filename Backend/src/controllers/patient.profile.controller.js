const {
  updatePatientProfileService,
  getPatientProfileService,
} = require("../services/patient.profile.service");

// UPDATE PATIENT PROFILE
exports.updatePatientProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const profile = await updatePatientProfileService(userId, req.body);

    res.json({
      message: "Patient profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "Patient profile not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to update profile" });
  }
};

// GET PATIENT PROFILE
exports.getPatientProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const profile = await getPatientProfileService(userId);

    res.json({ profile });
  } catch (error) {
    console.error(error);

    if (error.message === "Patient profile not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to fetch profile" });
  }
};