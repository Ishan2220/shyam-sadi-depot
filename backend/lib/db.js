const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/saree-depot";

let cached = global._mongooseConnection;

async function connectDB() {
  if (cached) {
    return cached;
  }

  try {
    cached = await mongoose.connect(MONGODB_URI);
    global._mongooseConnection = cached;
    console.log("✅ MongoDB connected");
    return cached;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

module.exports = connectDB;
