import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/Postroutes.js"; // ✅ Fixed casing for consistency
import analyticsRoutes from "./routes/analyticsRoutes.js";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (Removed deprecated options)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
    return;
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop server if DB connection fails
  }
};

connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/analytics", analyticsRoutes);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
