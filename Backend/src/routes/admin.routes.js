const express = require("express");
const router = express.Router();
const { getAdminStats, getUnverifiedDoctors, verifyDoctor, rejectDoctor } = require("../controllers/admin.controller");
const { authMiddleware, isAdmin } = require("../middleware/auth.middleware");

// Require auth and ADMIN role for all routes in this file
router.use(authMiddleware, isAdmin);

router.get("/stats", getAdminStats);
router.get("/doctors/unverified", getUnverifiedDoctors);
router.put("/doctors/:doctorId/verify", verifyDoctor);
router.delete("/doctors/:doctorId/reject", rejectDoctor);

module.exports = router;
