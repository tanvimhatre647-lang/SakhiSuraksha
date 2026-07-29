import express from "express";
import mongoose from "mongoose";
import ChatHistory from "../models/ChatHistory.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Middleware to check if MongoDB is connected
const checkDbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: "Database offline. Please make sure MongoDB is running on port 27017."
    });
  }
  next();
};

router.use(checkDbConnection);
router.use(authMiddleware);

// ── Get Chat History ─────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const history = await ChatHistory.find({ user: req.user.id }).sort({ createdAt: 1 });
    res.json(history);
  } catch (err) {
    console.error("Get chat history error:", err);
    res.status(500).json({ error: "Server error getting chat history" });
  }
});

// ── Save Chat Message ────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  const { role, text } = req.body;

  if (!role || !text) {
    return res.status(400).json({ error: "Role and text are required" });
  }

  try {
    const newMessage = new ChatHistory({
      user: req.user.id,
      role,
      text,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    console.error("Save chat message error:", err);
    res.status(500).json({ error: "Server error saving chat message" });
  }
});

// ── Clear Chat History ───────────────────────────────────────────────────────
router.delete("/", async (req, res) => {
  try {
    await ChatHistory.deleteMany({ user: req.user.id });
    res.json({ success: true, message: "Chat history cleared" });
  } catch (err) {
    console.error("Clear chat history error:", err);
    res.status(500).json({ error: "Server error clearing chat history" });
  }
});

export default router;
