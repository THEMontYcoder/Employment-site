const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// GET /api/jobs – list all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.json(jobs);
  } catch (err) {
    console.error("GET /jobs error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
