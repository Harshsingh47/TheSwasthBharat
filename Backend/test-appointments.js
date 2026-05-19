const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const API_BASE = "http://localhost:5000/api";
const MOCK_DOCTOR_EMAIL = `test.doctor.${Date.now()}@example.com`;
const MOCK_PATIENT_EMAIL = `test.patient.${Date.now()}@example.com`;
const MOCK_PASSWORD = "Password123!";

async function testBookingFlow() {
  console.log("🚀 Starting Booking & Dashboard E2E Test...\n");

  try {
    // 1. SETUP DOCTOR
    console.log("1️⃣  Setting up Doctor...");
    const doctorRegRes = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Dr. Booking Test", email: MOCK_DOCTOR_EMAIL, password: MOCK_PASSWORD, role: "DOCTOR" })
    });
    if (!doctorRegRes.ok) throw new Error(await doctorRegRes.text());

    const doctorLoginRes = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: MOCK_DOCTOR_EMAIL, password: MOCK_PASSWORD })
    });
    const doctorLoginData = await doctorLoginRes.json();
    const doctorToken = doctorLoginData.accessToken;
    const doctorUserId = doctorLoginData.user.id;

    await fetch(`${API_BASE}/doctor/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${doctorToken}` },
      body: JSON.stringify({ specialty: "Cardiologist", workingHours: "09:00 AM - 05:00 PM", availability: "Monday - Friday" })
    });

    await prisma.doctorProfile.update({
      where: { userId: doctorUserId },
      data: { isVerified: true }
    });
    
    const doctorProfileData = await prisma.doctorProfile.findUnique({ where: { userId: doctorUserId } });
    const doctorId = doctorProfileData.id;
    console.log("✅ Doctor successfully created, profiled, and verified!\n");

    // 2. SETUP PATIENT
    console.log("2️⃣  Setting up Patient...");
    const patientRegRes = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Patient Test", email: MOCK_PATIENT_EMAIL, password: MOCK_PASSWORD, role: "PATIENT" })
    });
    if (!patientRegRes.ok) throw new Error(await patientRegRes.text());

    const patientLoginRes = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: MOCK_PATIENT_EMAIL, password: MOCK_PASSWORD })
    });
    const patientLoginData = await patientLoginRes.json();
    const patientToken = patientLoginData.accessToken;
    console.log("✅ Patient successfully created and logged in!\n");

    // 3. BOOK APPOINTMENT
    console.log("3️⃣  Patient booking an appointment...");
    // Let's book for a weekday in the future (next Monday at 10:00 AM)
    const nextMonday = new Date();
    nextMonday.setDate(nextMonday.getDate() + ((1 + 7 - nextMonday.getDay()) % 7 || 7));
    nextMonday.setHours(10, 0, 0, 0);

    const bookingRes = await fetch(`${API_BASE}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${patientToken}` },
      body: JSON.stringify({
        doctorId: doctorId,
        date: nextMonday.toISOString(),
        reason: "Heart palpitations"
      })
    });
    if (!bookingRes.ok) throw new Error(await bookingRes.text());
    console.log("✅ Appointment successfully booked!\n");

    // 4. FETCH PATIENT DASHBOARD
    console.log("4️⃣  Fetching Patient Dashboard Appointments...");
    const patientDashRes = await fetch(`${API_BASE}/appointments/my`, {
      headers: { "Authorization": `Bearer ${patientToken}` }
    });
    const patientDashData = await patientDashRes.json();
    console.log(`✅ Patient Dashboard sees ${patientDashData.appointments.length} appointments.`);
    console.log(`   Doctor Name visible? ${!!patientDashData.appointments[0].doctor.user.name}\n`);

    // 5. FETCH DOCTOR DASHBOARD
    console.log("5️⃣  Fetching Doctor Dashboard Appointments...");
    const doctorDashRes = await fetch(`${API_BASE}/appointments/my`, {
      headers: { "Authorization": `Bearer ${doctorToken}` }
    });
    const doctorDashData = await doctorDashRes.json();
    console.log(`✅ Doctor Dashboard sees ${doctorDashData.appointments.length} appointments.`);
    console.log(`   Patient Name visible? ${!!doctorDashData.appointments[0].patient.name}`);
    console.log(`   Reason visible? ${doctorDashData.appointments[0].reason}`);

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY!");

  } catch (error) {
    console.error("\n❌ TEST FAILED:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testBookingFlow();
