const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const adminEmail = "admin@swasthbharat.com";
  const adminPassword = "AdminPassword123!";

  console.log("🚀 Seeding Admin User...");
  try {
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        isEmailVerified: true
      }
    });

    console.log("✅ Admin successfully created!");
    console.log(`✉️  Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);

  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
