const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    email: String,
    resume: String,       // optional URL / text
    coverLetter: String,  // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
