const jwt = require("jsonwebtoken");

// VERIFY TOKEN
exports.authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// DOCTOR ONLY
exports.isDoctor = (req, res, next) => {
  if (req.user.role !== "DOCTOR") {
    return res.status(403).json({ message: "Access denied (Doctor only)" });
  }
  next();
};

// PATIENT ONLY
exports.isPatient = (req, res, next) => {
  if (req.user.role !== "PATIENT") {
    return res.status(403).json({ message: "Access denied (Patient only)" });
  }
  next();
};