const express = require("express");
const router = express.Router();

const {
  updateDoctorProfile,
  getDoctorProfile,
} = require("../controllers/doctor.profile.controller");

const { authMiddleware, isDoctor } = require("../middleware/auth.middleware");

// GET profile
router.get("/profile", authMiddleware, isDoctor, getDoctorProfile);

// UPDATE profile
router.put("/profile", authMiddleware, isDoctor, updateDoctorProfile);

module.exports = router;