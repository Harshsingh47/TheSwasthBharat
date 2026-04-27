const express = require("express");
const router = express.Router();

const {
  updatePatientProfile,
  getPatientProfile,
} = require("../controllers/patient.profile.controller");

const { authMiddleware, isPatient } = require("../middleware/auth.middleware");

// GET profile
router.get("/profile", authMiddleware, isPatient, getPatientProfile);

// UPDATE profile
router.put("/profile", authMiddleware, isPatient, updatePatientProfile);

module.exports = router;