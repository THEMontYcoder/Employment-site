// backend/routes/adminRoutes.js
const express = require("express");
const { auth, adminOnly } = require("../middleware/authMiddleware");
const Job = require("../models/Job");
const Application = require("../models/Application");

const router = express.Router();

// Sare admin routes pe auth + adminOnly
router.use(auth, adminOnly);

/*
  GET /api/admin/jobs
*/
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("ADMIN GET JOBS error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/*
  POST /api/admin/jobs
*/
router.post("/jobs", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    console.error("ADMIN CREATE JOB error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/*
  DELETE /api/admin/jobs/:id
*/
router.delete("/jobs/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    console.error("ADMIN DELETE JOB error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/*
  GET /api/admin/applications
*/
router.get("/applications", async (req, res) => {
  try {
    const apps = await Application.find()
      .populate("job")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(apps);
  } catch (err) {
    console.error("ADMIN APPLICATIONS error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
