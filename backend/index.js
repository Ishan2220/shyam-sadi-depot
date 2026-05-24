const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/saree-depot";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

const inquiryRoutes = require("./routes/inquiry");
const reviewRoutes = require("./routes/reviews");

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/inquiry", inquiryRoutes);
app.use("/api/reviews", reviewRoutes);

// Seed admin account — hit this once to create the admin user
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const connectDB = require("./lib/db");

app.post("/api/seed-admin", async (req, res) => {
  try {
    await connectDB();
    const existing = await User.findOne({ email: "admin@shyamsadidepot.com" });
    if (existing) {
      return res.json({ message: "Admin already exists", email: "admin@shyamsadidepot.com" });
    }
    const hashedPassword = await bcrypt.hash("admin123", 12);
    await User.create({
      name: "Admin",
      email: "admin@shyamsadidepot.com",
      password: hashedPassword,
      role: "admin",
    });
    res.status(201).json({
      message: "Admin user created successfully",
      email: "admin@shyamsadidepot.com",
      password: "admin123",
    });
  } catch (error) {
    console.error("Seed admin error:", error);
    res.status(500).json({ error: "Failed to seed admin" });
  }
});

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Saree Depot API is running 🚀" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start Server (only if not in Vercel production)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

// Export for Vercel Serverless
module.exports = app;
