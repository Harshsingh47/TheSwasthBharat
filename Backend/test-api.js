const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const API_BASE = "http://localhost:5000/api";
const MOCK_EMAIL = `test.doctor.${Date.now()}@example.com`;
const MOCK_PASSWORD = "Password123!";

async function testFlow() {
  console.log("🚀 Starting API E2E Flow Test...\n");

  try {
    // 1. REGISTER DOCTOR
    console.log("1️⃣  Registering a new Doctor...");
    const registerRes = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Dr. Automated Test",
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD,
        role: "DOCTOR"
      })
    });
    
    if (!registerRes.ok) throw new Error(await registerRes.text());
    console.log("✅ Doctor registered successfully!\n");

    // 2. LOGIN TO GET TOKEN
    console.log("2️⃣  Logging in to retrieve JWT Token...");
    const loginRes = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD,
      })
    });

    if (!loginRes.ok) throw new Error(await loginRes.text());
    const loginData = await loginRes.json();
    const token = loginData.accessToken;
    console.log("✅ Token received successfully!\n");

    // 3. UPDATE PROFILE WITH NEW PAYLOAD
    console.log("3️⃣  Updating Profile with Availability Strings & Profile Picture...");
    const profileRes = await fetch(`${API_BASE}/doctor/profile`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        specialty: "Neurologist",
        location: "Mumbai",
        consultationFee: 1500,
        workingHours: "10:00 AM - 06:00 PM",
        availability: "Monday - Friday",
        profilePicture: "https://example.com/mock-avatar-test.png"
      })
    });

    if (!profileRes.ok) throw new Error(await profileRes.text());
    const profileData = await profileRes.json();
    console.log("✅ Profile parsed and updated! (Check your DB for DoctorAvailability rows)\n");

    // 4. VERIFY DOCTOR VIA PRISMA (So they appear in search)
    console.log("4️⃣  Verifying Doctor manually via Database (Admin Step)...");
    await prisma.doctorProfile.update({
      where: { userId: loginData.user.id },
      data: { isVerified: true }
    });
    console.log("✅ Doctor is verified!\n");

    // 5. TEST SEARCH ENGINE ENDPOINT
    console.log("5️⃣  Testing Search Engine (GET /api/doctor?search=Neurologist)...");
    const searchRes = await fetch(`${API_BASE}/doctor?search=Neurologist&location=Mumbai`);
    if (!searchRes.ok) throw new Error(await searchRes.text());
    
    const searchData = await searchRes.json();
    console.log(`✅ Search returned ${searchData.data.length} doctors.`);
    
    const foundDoctor = searchData.data.find(d => d.user.name === "Dr. Automated Test");
    if (foundDoctor) {
      console.log("\n🎉 SUCCESS! Your new doctor is fully searchable!");
      console.log(`   Name: ${foundDoctor.user.name}`);
      console.log(`   Avatar Saved: ${foundDoctor.user.avatarUrl === "https://example.com/mock-avatar-test.png" ? "YES" : "NO"}`);
    } else {
      console.log("\n⚠️  Doctor did not appear in search results.");
    }

  } catch (error) {
    console.error("\n❌ TEST FAILED:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testFlow();
