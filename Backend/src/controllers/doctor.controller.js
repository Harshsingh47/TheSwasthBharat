const {
  updateDoctorProfileService,
  getDoctorProfileService, getDoctorsListService, getDoctorDetailsService, setDoctorAvailabilityService, 
  getDoctorSlotsService
} = require("../services/doctor.service");

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

// GET DOCTORS LIST
exports.getDoctorsList = async (req, res) => {
  try {
    const result = await getDoctorsListService(req.query);
    res.json(result);
  } catch (error) {
    console.error("🔥 ERROR:", error); // 👈 ADD THIS

    res.status(500).json({
      message: "Failed to fetch doctors",
      error: error.message, // 👈 ADD THIS
    });
  }
};

// GET SINGLE DOCTOR DETAILS
exports.getDoctorDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await getDoctorDetailsService(id);

    res.json({ doctor });
  } catch (error) {
    console.error(error);

    if (error.message === "Doctor not found") {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === "Doctor not available") {
      return res.status(403).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to fetch doctor details" });
  }
};

exports.setAvailability = async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ from JWT

    const result = await setDoctorAvailabilityService(
      userId,
      req.body
    );

    res.json({
      message: "Availability set successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.getDoctorSlots = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const slots = await getDoctorSlotsService(id, date);

    res.json({ slots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch slots" });
  }
};