// backend/routes/applyRoutes.js

const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// POST /api/apply/:jobId
// User kisi job ke liye apply karega (auth temporarily removed)
router.post("/:jobId", async (req, res) => {
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
    const application = await Application.create({
      jobId,
      // userId abhi store nahi kar rahe (auth baad me add karenge)
      userId: null,
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
    return res
      .status(500)
      .json({ message: "Server error while applying for job" });
  }
});

// GET /api/apply/my?email=xyz
// Simple version: email ke basis pe applications nikaal lo
router.get("/my", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email query param is required ( ?email= )" });
    }

    const apps = await Application.find({ email }).sort({ createdAt: -1 });
    return res.json(apps);
  } catch (err) {
    console.error("Get my applications error:", err);
    return res
      .status(500)
      .json({ message: "Server error fetching applications" });
  }
});

module.exports = router;
