// backend/seedJobs.js

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Job = require("./models/job");

async function seedJobs() {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();

    console.log("Clearing old jobs...");
    await Job.deleteMany({});

    console.log("Inserting sample jobs...");
    await Job.insertMany([
      {
        title: "Frontend Developer",
        company: "Google",
        location: "Remote",
        type: "Full-time",
        salary: "₹10–15 LPA",
        description: "Build modern UI using React, HTML, CSS and JavaScript.",
        skills: ["JavaScript", "React", "CSS"],
      },
      {
        title: "Backend Developer",
        company: "Amazon",
        location: "Bangalore",
        type: "Full-time",
        salary: "₹15–20 LPA",
        description: "Work on Node.js APIs, MongoDB and microservices.",
        skills: ["Node.js", "Express", "MongoDB"],
      },
      {
        title: "Fullstack Engineer",
        company: "Microsoft",
        location: "Hyderabad",
        type: "Remote",
        salary: "₹18–25 LPA",
        description: "End-to-end web application development.",
        skills: ["React", "Node.js", "MongoDB"],
      },
    ]);

    console.log("✅ Job seeding complete!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  }
}

seedJobs();
