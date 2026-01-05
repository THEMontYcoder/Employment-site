// backend/routes/applyRoutes.js
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Application = require("../models/application");

// POST /api/apply/:jobId
router.post("/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const { name, email, resume, coverLetter } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "jobId is required in URL" });
    }
    if (!name || !email || !resume) {
      return res
        .status(400)
        .json({ message: "Name, email and resume are required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = await Application.create({
      job: jobId,
      jobTitle: job.title,
      name,
      email,
      resume,
      coverLetter: coverLetter || ""
    });

    return res.status(201).json({
      message: "Application submitted successfully!",
      applicationId: application._id
    });
  } catch (err) {
    console.error("Apply API error:", err);
    return res.status(500).json({
      message: "Internal server error while applying",
      error: err.message
    });
  }
});

module.exports = router;
