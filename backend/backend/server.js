// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// .env load
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB connect
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));      // login / register / admin login
app.use("/api/jobs", require("./routes/jobRoutes"));       // public jobs
app.use("/api/admin", require("./routes/adminRoutes"));    // admin protected routes
app.use("/api/apply", require("./routes/applyRoutes"));    // apply + my applications

// Test root route
app.get("/", (req, res) => {
  res.send("Employment Backend Running ✔️");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
