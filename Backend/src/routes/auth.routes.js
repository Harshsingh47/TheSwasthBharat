const express = require("express");
const router = express.Router();

const rateLimit = require("express-rate-limit");
const { signup, login, googleLogin, verifyOtp, googleLinkPhone } = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { signupSchema, loginSchema, googleAuthSchema } = require("../validators/auth.validator");
// rate limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many attempts, please try again later" },
});
console.log("signup:", typeof signup);
console.log("login:", typeof login);
console.log("googleLogin:", typeof googleLogin);
console.log("validate:", typeof validate);
console.log("googleAuthSchema:", typeof googleAuthSchema);
// routes
router.post("/signup", authLimiter, validate(signupSchema), signup);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/google", authLimiter, validate(googleAuthSchema), googleLogin);
router.post("/verify-otp", authLimiter, verifyOtp);
router.post("/google-link-phone", authLimiter, googleLinkPhone);

// export router
module.exports = router;