// backend/models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: "Remote",
    },
    salary: {
      type: String, // abhi string rakhte hain (e.g. "5-8 LPA")
    },
    type: {
      type: String, // e.g. "Full-time", "Internship"
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto add
  }
);

module.exports = mongoose.model("Job", jobSchema);
