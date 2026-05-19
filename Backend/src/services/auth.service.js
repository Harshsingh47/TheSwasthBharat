const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const VALID_ROLES = ["DOCTOR", "PATIENT"];
const otpStore = new Map();
exports.otpStore = otpStore;

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
      data: { 
        name, 
        email: normalizedEmail, 
        phone, 
        password: hashedPassword, 
        role,
        isEmailVerified: false // Everyone needs OTP verification before login
      },
    });

    if (role === "DOCTOR") {
      await tx.doctorProfile.create({ data: { userId: user.id } });
    } else {
      await tx.patientProfile.create({ data: { userId: user.id } });
    }

    return user;
  });

  const requiresOtp = true;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(normalizedEmail, {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000 // 10 mins expiration
  });

  console.log("\n==========================================");
  console.log(`🔑 OTP VERIFICATION CODE FOR ${role} SIGNUP`);
  console.log(`   Email: ${normalizedEmail}`);
  console.log(`   Phone: ${phone}`);
  console.log(`   Code:  ${otp}`);
  console.log("==========================================\n");

  const { password: _, ...userWithoutPassword } = newUser;
  return { ...userWithoutPassword, requiresOtp, otp };
};

exports.loginService = async (email, password) => {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    include: { doctorProfile: true, patientProfile: true },
  });

  if (!user) throw new Error("Invalid email or password");

  if (!user.isEmailVerified) {
    if (user.role === "DOCTOR") {
      throw new Error("Email & phone not verified. Please verify your credentials via OTP.");
    } else {
      throw new Error("Phone number not verified. Please verify your phone via OTP.");
    }
  }

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

  if (!user.phone) {
    return {
      requiresPhoneInput: true,
      email: user.email,
      message: "Please complete registration by verifying your phone number."
    };
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

exports.verifyOtpService = async (email, otp) => {
  const normalizedEmail = email.toLowerCase().trim();
  const record = otpStore.get(normalizedEmail);

  if (!record) {
    throw new Error("No OTP request found for this email. Please sign up or resend OTP.");
  }

  if (record.expiresAt < Date.now()) {
    otpStore.delete(normalizedEmail);
    throw new Error("OTP has expired. Please request a new one.");
  }

  if (record.otp !== otp) {
    throw new Error("Invalid OTP code. Please check your credentials.");
  }

  // Update user in DB
  await prisma.user.update({
    where: { email: normalizedEmail },
    data: { isEmailVerified: true }
  });

  otpStore.delete(normalizedEmail);
  return true;
};

exports.googleLinkPhoneService = async (email, phone) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  });

  if (!user) throw new Error("Google account record not found.");

  // Save phone number
  await prisma.user.update({
    where: { id: user.id },
    data: { phone }
  });

  // Generate phone verification OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(normalizedEmail, {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000 // 10 mins
  });

  console.log("\n==========================================");
  console.log(`📞 OTP FOR GOOGLE SIGNUP PHONE VERIFICATION`);
  console.log(`   Email: ${normalizedEmail}`);
  console.log(`   Phone: ${phone}`);
  console.log(`   Code:  ${otp}`);
  console.log("==========================================\n");

  return {
    email: normalizedEmail,
    requiresOtp: true,
    otp
  };
};