// backend/routes/applyRoutes.js
const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const Application = require("../models/Application");
const Job = require("../models/Job");

const router = express.Router();

/*
  POST /api/apply/:jobId
  → Logged-in user applies to a job
*/
router.post("/:jobId", auth, async (req, res) => {
  try {
    const { jobId } = req.params;
    const { name, email, resume, coverLetter } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ❗ Duplicate application check
    const existingApp = await Application.findOne({
      job: job._id,
      user: req.user.id,
    });

    if (existingApp) {
      return res.status(400).json({
        message: "You have already applied for this job.",
      });
    }

    const application = await Application.create({
      job: job._id,
      user: req.user.id,
      name,
      email,
      resume: resume || "",
      coverLetter: coverLetter || "",
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    console.error("APPLY error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/*
  GET /api/apply/my
  → Logged-in user ke saare applications
*/
router.get("/my", auth, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate("job")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error("MY APPLICATIONS error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
