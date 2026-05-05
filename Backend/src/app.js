const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const doctorRoutes = require("./routes/doctor.routes");
const patientRoutes = require("./routes/patient.profile.routes");
const appointmentRoutes = require("./routes/appointment.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); 
app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/appointments", appointmentRoutes);


app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});
console.log("DB URL:", process.env.DATABASE_URL);
module.exports = app;