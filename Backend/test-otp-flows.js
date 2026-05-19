const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const API_BASE = "http://localhost:5000/api";
const TIMESTAMP = Date.now();
const MOCK_PATIENT_EMAIL = `patient.${TIMESTAMP}@example.com`;
const MOCK_PATIENT_PHONE = `99887${String(TIMESTAMP).slice(-5)}`;
const MOCK_DOCTOR_EMAIL = `doctor.${TIMESTAMP}@example.com`;
const MOCK_DOCTOR_PHONE = `88776${String(TIMESTAMP).slice(-5)}`;
const MOCK_PASSWORD = "Password123!";

async function testOtpFlows() {
  console.log("=================================================");
  console.log("🧪 STARTING E2E OTP & VERIFICATION FLOW TESTS 🧪");
  console.log("=================================================\n");

  try {
    // -------------------------------------------------------------
    // TEST 1: PATIENT SIGNUP & PHONE OTP VERIFICATION
    // -------------------------------------------------------------
    console.log("🔹 TEST 1: Patient Registration (Phone OTP Required)");
    console.log(`   Registering Patient: ${MOCK_PATIENT_EMAIL} (${MOCK_PATIENT_PHONE})`);
    
    const patientSignupRes = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Patient",
        email: MOCK_PATIENT_EMAIL,
        phone: MOCK_PATIENT_PHONE,
        password: MOCK_PASSWORD,
        role: "PATIENT"
      })
    });

    if (!patientSignupRes.ok) throw new Error(`Signup failed: ${await patientSignupRes.text()}`);
    const patientSignupData = await patientSignupRes.json();
    
    console.log("   ✅ Patient registered successfully!");
    console.log(`   Requires OTP: ${patientSignupData.requiresOtp}`);
    console.log(`   Generated OTP: ${patientSignupData.otp}`);

    // Try logging in before OTP verification (Should Fail)
    console.log("\n   Attempting login before verification...");
    const preVerifyLoginRes = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: MOCK_PATIENT_EMAIL,
        password: MOCK_PASSWORD
      })
    });

    if (preVerifyLoginRes.status === 403) {
      const errData = await preVerifyLoginRes.json();
      console.log(`   ✅ Correctly blocked login! Message: "${errData.message}"`);
    } else {
      throw new Error(`Login should have failed with status 403 (Forbidden), but got status ${preVerifyLoginRes.status}`);
    }

    // Verify OTP
    console.log("\n   Verifying Patient OTP...");
    const patientVerifyRes = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: MOCK_PATIENT_EMAIL,
        otp: patientSignupData.otp
      })
    });

    if (!patientVerifyRes.ok) throw new Error(`Verification failed: ${await patientVerifyRes.text()}`);
    console.log("   ✅ Patient OTP verified successfully!");

    // Login after OTP verification (Should Succeed)
    console.log("\n   Logging in after OTP verification...");
    const postVerifyLoginRes = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: MOCK_PATIENT_EMAIL,
        password: MOCK_PASSWORD
      })
    });

    if (!postVerifyLoginRes.ok) throw new Error(`Post-verification login failed: ${await postVerifyLoginRes.text()}`);
    const postVerifyLoginData = await postVerifyLoginRes.json();
    console.log(`   ✅ Login Successful! User Role: ${postVerifyLoginData.user.role}`);

    console.log("\n=================================================\n");

    // -------------------------------------------------------------
    // TEST 2: DOCTOR SIGNUP & EMAIL + PHONE OTP VERIFICATION
    // -------------------------------------------------------------
    console.log("🔹 TEST 2: Doctor Registration (Email & Phone OTP Required)");
    console.log(`   Registering Doctor: ${MOCK_DOCTOR_EMAIL} (${MOCK_DOCTOR_PHONE})`);

    const doctorSignupRes = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Dr. Test Verification",
        email: MOCK_DOCTOR_EMAIL,
        phone: MOCK_DOCTOR_PHONE,
        password: MOCK_PASSWORD,
        role: "DOCTOR"
      })
    });

    if (!doctorSignupRes.ok) throw new Error(`Doctor signup failed: ${await doctorSignupRes.text()}`);
    const doctorSignupData = await doctorSignupRes.json();

    console.log("   ✅ Doctor registered successfully!");
    console.log(`   Requires OTP: ${doctorSignupData.requiresOtp}`);
    console.log(`   Generated OTP: ${doctorSignupData.otp}`);

    // Verify Doctor OTP
    console.log("\n   Verifying Doctor OTP...");
    const doctorVerifyRes = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: MOCK_DOCTOR_EMAIL,
        otp: doctorSignupData.otp
      })
    });

    if (!doctorVerifyRes.ok) throw new Error(`Doctor verification failed: ${await doctorVerifyRes.text()}`);
    console.log("   ✅ Doctor OTP verified successfully!");

    // Login Doctor (Should succeed now, but dashboard will flag as unverified by admin)
    console.log("\n   Logging in Doctor...");
    const doctorLoginRes = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: MOCK_DOCTOR_EMAIL,
        password: MOCK_PASSWORD
      })
    });

    if (!doctorLoginRes.ok) throw new Error(`Doctor login failed: ${await doctorLoginRes.text()}`);
    const doctorLoginData = await doctorLoginRes.json();
    console.log(`   ✅ Doctor Login Successful!`);
    
    // Check if DoctorProfile.isVerified is false (Will show Admin Banner)
    const docProfile = await prisma.doctorProfile.findUnique({
      where: { userId: doctorLoginData.user.id }
    });
    console.log(`   ✅ Doctor Profile status (isVerified): ${docProfile.isVerified} (Should be false -> Shows Admin pending banner!)`);

    console.log("\n=================================================");
    console.log("🎉 SUCCESS! ALL E2E OTP FLOW TESTS PASSED SUCCESSFULLY!");
    console.log("=================================================");

  } catch (error) {
    console.error("\n❌ TEST FAILURE:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testOtpFlows();
