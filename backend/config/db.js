// config/db.js
require("dotenv").config();
const mongoose = require("mongoose");

/**
 * Connects to MongoDB Atlas using MONGO_URI from .env
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Successfully connected to MongoDB!");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    //  process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
