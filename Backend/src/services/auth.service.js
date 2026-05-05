const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const VALID_ROLES = ["DOCTOR", "PATIENT"];

exports.signupService = async ({ name, email, phone, password, role }) => {
  if (!VALID_ROLES.includes(role)) throw new Error("Invalid role");

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (existingUser) throw new Error("User already exists ");

  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

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

  if (!user.password) {
    throw new Error("Please login with Google");
  }

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

exports.googleAuthService = async (token, role) => {
  if (!token) throw new Error("Google token is required");

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { sub: googleId, email, name, picture } = payload;

  const normalizedEmail = email.toLowerCase().trim();

  let user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    if (!role || !VALID_ROLES.includes(role)) {
      throw new Error("Role is required for new Google signups");
    }

    user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name,
          email: normalizedEmail,
          googleId,
          role,
          authProvider: "GOOGLE",
          isEmailVerified: true,
          avatarUrl: picture,
        },
      });

      if (role === "DOCTOR") {
        await tx.doctorProfile.create({ data: { userId: newUser.id } });
      } else {
        await tx.patientProfile.create({ data: { userId: newUser.id } });
      }

      return newUser;
    });
  } else {
    // 🔐 Handle provider logic
    if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId,
          authProvider: "GOOGLE",
          isEmailVerified: true,
        },
      });
    } else if (user.googleId !== googleId) {
      throw new Error("Google account mismatch");
    }
  }

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