const express = require("express");
const router = express.Router();

const {
  updateDoctorProfile,
  getDoctorProfile,
  getDoctorsList,
  getDoctorDetails,
  setAvailability,
  getDoctorSlots
} = require("../controllers/doctor.controller");

const { authMiddleware, isDoctor } = require("../middleware/auth.middleware");

// GET profile

router.get("/profile", authMiddleware, isDoctor, getDoctorProfile);

// UPDATE profile
router.put("/profile", authMiddleware, isDoctor, updateDoctorProfile);

//Doctor Availabilty
router.post("/availability", authMiddleware, isDoctor, setAvailability);

// PUBLIC route (no auth needed)
router.get("/", getDoctorsList);
router.get("/:id/slots", getDoctorSlots);   // ✅ MUST COME BEFORE
router.get("/:id", getDoctorDetails);

module.exports = router;
