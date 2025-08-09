import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";

const router = express.Router();

// POST /api/shorten - Create shortened URL
router.post("/shorten", async (req, res) => {
  try {
    const { original_url } = req.body;

    // Basic URL validation
    if (!original_url) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    // Add protocol if not present
    let validUrl = original_url;
    if (
      !original_url.startsWith("http://") &&
      !original_url.startsWith("https://")
    ) {
      validUrl = "https://" + original_url;
    }

    // Check if URL already exists
    let existingUrl = await Url.findOne({ original_url: validUrl });
    if (existingUrl) {
      return res.json({
        original_url: existingUrl.original_url,
        short_code: existingUrl.short_code,
        short_url: `${req.protocol}://${req.get("host")}/${
          existingUrl.short_code
        }`,
        created_at: existingUrl.created_at,
      });
    }

    // Generate unique short code
    let short_code;
    let isUnique = false;
    while (!isUnique) {
      short_code = nanoid(6);
      const existing = await Url.findOne({ short_code });
      if (!existing) {
        isUnique = true;
      }
    }

    // Create new URL entry
    const newUrl = new Url({
      original_url: validUrl,
      short_code,
    });

    await newUrl.save();

    res.json({
      original_url: newUrl.original_url,
      short_code: newUrl.short_code,
      short_url: `${req.protocol}://${req.get("host")}/${newUrl.short_code}`,
      created_at: newUrl.created_at,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/urls - Get all URLs (for admin page)
router.get("/urls", async (req, res) => {
  try {
    const urls = await Url.find().sort({ created_at: -1 });
    res.json(urls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
