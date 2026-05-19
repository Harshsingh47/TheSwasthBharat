const { getAdminStatsService, getUnverifiedDoctorsService, verifyDoctorService, rejectDoctorService } = require("../services/admin.service");

exports.getAdminStats = async (req, res) => {
  try {
    const stats = await getAdminStatsService();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

exports.getUnverifiedDoctors = async (req, res) => {
  try {
    const doctors = await getUnverifiedDoctorsService();
    res.json({ doctors });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

exports.verifyDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    await verifyDoctorService(doctorId);
    res.json({ message: "Doctor successfully verified" });
  } catch (error) {
    res.status(500).json({ message: "Failed to verify doctor" });
  }
};

exports.rejectDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    await rejectDoctorService(doctorId);
    res.json({ message: "Doctor successfully rejected and removed" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to reject doctor" });
  }
};
