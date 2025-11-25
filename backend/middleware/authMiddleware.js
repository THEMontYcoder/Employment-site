// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Normal user / admin dono ke liye auth
function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecret"
    );

    // user token: { userId, role }
    // admin token: { email, isAdmin }
    req.user = {
      id: decoded.userId || null,
      role: decoded.role || null,
      isAdmin: decoded.isAdmin || false,
    };

    next();
  } catch (err) {
    console.error("auth middleware error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Sirf admin ke liye
function adminOnly(req, res, next) {
  if (!req.user || (!req.user.isAdmin && req.user.role !== "admin")) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
}

module.exports = { auth, adminOnly };
