// backend/routes/applyRoutes.js
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Application = require("../models/Application");

// Apply for a job
router.post("/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const { name, email, resume, coverLetter } = req.body;

    // Basic validation
    if (!jobId) {
      return res.status(400).json({ message: "jobId is required in URL" });
    }
    if (!name || !email || !resume) {
      return res.status(400).json({
        message: "Name, email and resume are required",
      });
    }

    // Make sure job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Save application in DB
    const application = new Application({
      job: jobId,
      jobTitle: job.title,
      name,
      email,
      resume,
      coverLetter: coverLetter || "",
    });

    await application.save();

    return res.status(201).json({
      message: "Application submitted successfully!",
      applicationId: application._id,
    });
  } catch (err) {
    console.error("Apply API error:", err);
    return res.status(500).json({
      message: "Internal server error while applying",
      // debug ke liye; prod me hata bhi sakte ho
      error: err.message,
    });
  }
});

module.exports = router;
