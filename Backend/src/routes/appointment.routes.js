const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getMyAppointments,
} = require("../controllers/appointment.controller");

const { authMiddleware, isPatient } = require("../middleware/auth.middleware");

// BOOK APPOINTMENT
router.post("/", authMiddleware, isPatient, createAppointment);

// GET MY APPOINTMENTS
router.get("/my", authMiddleware, isPatient, getMyAppointments);

module.exports = router;