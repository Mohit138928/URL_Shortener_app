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

// Middleware
app.use(cors());
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

// Redirect route - GET /:shortcode
app.get("/:shortcode", async (req, res) => {
  try {
    const { shortcode } = req.params;

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

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "URL Shortener API is running" });
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
