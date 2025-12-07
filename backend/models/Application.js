const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    // 🔹 Abhi ke liye user ko optional rakho ya hata do
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,       // <– change this
    },

    // Tum actually yeh fields use kar rahe ho:
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
      default: "",
    },

    // OPTIONAL: agar tum jobTitle bhi store karna chahte ho
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
