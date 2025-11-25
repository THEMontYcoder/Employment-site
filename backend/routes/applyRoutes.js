// backend/routes/applyRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Application = require("../models/Application");
// Job model optional hai; agar sirf jobId store karna ho to zaroori nahi
// const Job = require("../models/Job");

// POST /api/apply/:jobId
// User ek job ke liye apply karega
router.post("/:jobId", auth, async (req, res) => {
  const { jobId } = req.params;
  const { name, email, resume, coverLetter } = req.body;

  if (!jobId) {
    return res.status(400).json({ message: "Job ID is required" });
  }

  if (!name || !email || !resume) {
    return res
      .status(400)
      .json({ message: "Name, email and resume are required" });
  }

  try {
    const userId = req.user && (req.user.userId || req.user.id);

    // Check duplicate application (same user + same job)
    if (userId) {
      const existing = await Application.findOne({ jobId, userId });
      if (existing) {
        return res
          .status(400)
          .json({ message: "You have already applied for this job." });
      }
    }

    const application = await Application.create({
      jobId,
      userId: userId || null,
      name,
      email,
      resume,
      coverLetter: coverLetter || "",
      createdAt: new Date(),
    });

    return res.json({
      message: "Application submitted successfully!",
      application,
    });
  } catch (err) {
    console.error("Apply error:", err);
    return res.status(500).json({ message: "Server error while applying" });
  }
});

// GET /api/apply/my
// Logged-in user apni applications dekh sakta hai
router.get("/my", auth, async (req, res) => {
  try {
    const userId = req.user && (req.user.userId || req.user.id);
    if (!userId) {
      return res.status(401).json({ message: "User not found in token" });
    }

    const apps = await Application.find({ userId }).sort({ createdAt: -1 });
    return res.json(apps);
  } catch (err) {
    console.error("Get my applications error:", err);
    return res.status(500).json({ message: "Server error fetching applications" });
  }
});

module.exports = router;
