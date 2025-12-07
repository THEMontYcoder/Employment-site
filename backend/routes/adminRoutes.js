const express = require("express");
const Job = require("../models/Job");
const Application = require("../models/Application");

const router = express.Router();

// (Optional) admin login yahan bhi rakh sakte ho – but tumne abhi /api/auth/admin-login use kar liya hai
// router.post("/login", ...)

// Add new job: POST /api/admin/add-job
router.post("/add-job", async (req, res) => {
  try {
    const { title, company, location, description, salary, type } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({
        success: false,
        message: "title, company, location, description required"
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      description,
      salary: salary || "Not disclosed",
      type: type || "Full-time"
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job
    });
  } catch (err) {
    console.error("Add job error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error while adding job" });
  }
});

// Optional: admin applications view
router.get("/applications", async (req, res) => {
  try {
    const apps = await Application.find()
      .populate("job", "title company location")
      .sort({ createdAt: -1 });

    return res.json({ success: true, applications: apps });
  } catch (err) {
    console.error("Get applications error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error while fetching apps" });
  }
});

module.exports = router;
