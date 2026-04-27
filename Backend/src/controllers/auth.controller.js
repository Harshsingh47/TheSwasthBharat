const { signupService, loginService } = require("../services/auth.service");

const getErrorStatus = (message) => {
  if (message === "User already exists") return 409;
  if (message === "Invalid email or password") return 401;
  if (message === "Invalid role") return 422;
  return 500;
};

// SIGNUP CONTROLLER
exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.status(422).json({ message: "All fields are required" });
    }

    await signupService({ name, email, phone, password, role });

    res.status(201).json({ message: "Signup successful. Please login." });
  } catch (error) {
    res.status(getErrorStatus(error.message)).json({ message: error.message });
  }
};

// LOGIN CONTROLLER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "Email and password are required" });
    }

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