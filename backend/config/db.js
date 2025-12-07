// backend/config/db.js
const mongoose = require("mongoose");

async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✔️");
  } catch (err) {
    console.error("MongoDB Error ❌", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
