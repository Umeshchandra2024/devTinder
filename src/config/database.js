const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error("[DB] MONGODB_URI is not defined in environment variables.");
    throw new Error("MONGODB_URI is missing");
  }

  try {
    console.log("[DB] Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("[DB] MongoDB connection established successfully.");
  } catch (err) {
    console.error("[DB] Failed to connect to MongoDB:", err.message);
    throw err;
  }
};

module.exports = connectDB;

