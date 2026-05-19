const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUnverifiedDoctor() {
  console.log("🚀 Creating an unverified doctor for testing...");
  try {
    const user = await prisma.user.create({
      data: {
        name: "Dr. Test Unverified",
        email: "unverified@swasthbharat.com",
        password: "password123",
        role: "DOCTOR",
        isEmailVerified: true,
        phone: "1234567890",
        doctorProfile: {
          create: {
            isVerified: false,
            specialty: "Cardiology",
            experience: 5,
            consultationFee: 500,
            bio: "I am a test doctor waiting for admin verification.",
            qualification: "MBBS, MD",
            university: "AIIMS Delhi",
            registrationNumber: "MCI-12345",
            hospitalAffiliation: "Swasth Bharat General",
            location: "Delhi",
            degreeCertificateUrl: "https://example.com/degree.pdf",
            idProofUrl: "https://example.com/id.pdf"
          }
        }
      }
    });
    console.log("✅ Successfully created unverified doctor!");
    console.log("Doctor Name:", user.name);
  } catch (err) {
    if (err.code === 'P2002') {
      console.log("⚠️ This test doctor already exists. Forcing isVerified = false...");
      const existingUser = await prisma.user.findUnique({ where: { email: "unverified@swasthbharat.com" } });
      await prisma.doctorProfile.update({
        where: { userId: existingUser.id },
        data: { isVerified: false }
      });
      console.log("✅ Successfully forced isVerified to false!");
    } else {
      console.error("❌ Error:", err.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createUnverifiedDoctor();
