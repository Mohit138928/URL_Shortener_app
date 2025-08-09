import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";
import apiRoutes from "./routes/api.js";
import Url from "./models/Url.js";

// ES6 module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [process.env.FRONTEND_URL || "https://your-app.vercel.app"]
      : ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/urlshortener"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Routes
app.use("/api", apiRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "URL Shortener API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      shorten: "/api/shorten",
      urls: "/api/urls",
      redirect: "/:shortcode",
    },
    status: "running",
  });
});

// Health check route (must come before /:shortcode)
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "URL Shortener API is running",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || "development",
  });
});

// Redirect route - GET /:shortcode (must come after specific routes)
app.get("/:shortcode", async (req, res) => {
  try {
    const { shortcode } = req.params;

    // Skip health and other system routes
    if (
      shortcode === "health" ||
      shortcode === "api" ||
      shortcode.startsWith("_")
    ) {
      return res.status(404).json({ error: "Route not found" });
    }

    // Find URL by short code
    const url = await Url.findOne({ short_code: shortcode });

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Increment visit count
    url.visits += 1;
    await url.save();

    // Redirect to original URL
    res.redirect(url.original_url);
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  });
});

export default app;
