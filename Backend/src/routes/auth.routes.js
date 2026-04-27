const express = require("express");
const router = express.Router();

const rateLimit = require("express-rate-limit");
const { signup, login } = require("../controllers/auth.controller");

// rate limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many attempts, please try again later" },
});

// routes
router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);

// export router
module.exports = router;