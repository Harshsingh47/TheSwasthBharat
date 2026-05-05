const {
  createAppointmentService,
  getMyAppointmentsService,
} = require("../services/appointment.service");

// CREATE APPOINTMENT
exports.createAppointment = async (req, res) => {
  try {
    const userId = req.user.userId;

    const appointment = await createAppointmentService(userId, req.body);

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);

    if (
      error.message === "Doctor not available" ||
      error.message === "Slot already booked" ||
      error.message === "Doctor and date are required"
    ) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to book appointment" });
  }
};

// GET MY APPOINTMENTS
exports.getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.userId;

    const appointments = await getMyAppointmentsService(userId);

    res.json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};