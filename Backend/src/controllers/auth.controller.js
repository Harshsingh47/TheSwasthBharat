const { signupService, loginService, googleAuthService } = require("../services/auth.service");

const getErrorStatus = (message) => {
  if (message === "User already exists") return 409;
  if (message === "Invalid email or password") return 401;
  if (message === "Invalid role") return 422;
  if (message.includes("verified")) return 403;
  return 500;
};

// SIGNUP CONTROLLER
exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const result = await signupService({ name, email, phone, password, role });

    res.status(201).json({ 
      message: result.requiresOtp 
        ? "Signup initiated. Verification OTP sent to email and phone." 
        : "Signup successful. Please login.",
      requiresOtp: result.requiresOtp,
      email: result.email,
      otp: result.otp // For easy testing/demo
    });
  } catch (error) {
    res.status(getErrorStatus(error.message)).json({ message: error.message });
  }
};

// VERIFY OTP CONTROLLER
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP code are required" });
    }
    const { verifyOtpService } = require("../services/auth.service");
    await verifyOtpService(email, otp);
    res.json({ message: "OTP verification successful! You can now log in." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGIN CONTROLLER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } = await loginService(email, password);

    // Refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      accessToken,
      user,
    });
  } catch (error) {
    res.status(getErrorStatus(error.message)).json({ message: error.message });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { token, role } = req.body;

    const result = await googleAuthService(token, role);

    if (result.requiresPhoneInput) {
      return res.json({
        requiresPhoneInput: true,
        email: result.email,
        message: result.message
      });
    }

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Google Login successful",
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.googleLinkPhone = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email || !phone) {
      return res.status(400).json({ message: "Email and Phone number are required." });
    }
    const { googleLinkPhoneService } = require("../services/auth.service");
    const result = await googleLinkPhoneService(email, phone);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};