const express = require("express");
const cors = require("cors");
// const connectDB = require("./db");  // abhi DB off rakhenge

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB se connect – abhi hata diya hai
// connectDB();

// ROOT route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// TEST route
app.get("/test", (req, res) => {
  res.send("Test route working!");
});

// ----- STATIC JOB DATA abhi ke liye (sirf check karne ke liye) -----
const sampleJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Remote",
    description: "React developer"
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Amazon",
    location: "Bangalore",
    description: "Node.js + MongoDB"
  },
  {
    id: 3,
    title: "Fullstack Engineer",
    company: "Microsoft",
    location: "Hyderabad",
    description: "MERN stack"
  }
];

// /jobs route (optional)
app.get("/jobs", (req, res) => {
  res.json(sampleJobs);
});

// /api/jobs route (jo tumhara frontend use kar raha hai)
app.get("/api/jobs", (req, res) => {
  res.json(sampleJobs);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
