const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const VALID_ROLES = ["DOCTOR", "PATIENT"];

exports.signupService = async ({ name, email, phone, password, role }) => {
  if (!VALID_ROLES.includes(role)) throw new Error("Invalid role");

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (existingUser) throw new Error("User already exists ");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { name, email: normalizedEmail, phone, password: hashedPassword, role },
    });

    if (role === "DOCTOR") {
      await tx.doctorProfile.create({ data: { userId: user.id } });
    } else {
      await tx.patientProfile.create({ data: { userId: user.id } });
    }

    return user;
  });

  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

exports.loginService = async (email, password) => {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    include: { doctorProfile: true, patientProfile: true },
  });

  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, name: user.name, role: user.role },
  };
};