const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    // abhi ke liye optional
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },

    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    resume: {
      type: String,
      required: true
    },
    coverLetter: {
      type: String,
      default: ""
    },

    jobTitle: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
