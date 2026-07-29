// backend/server.js
import "dotenv/config";
import express from "express";
import mysql from "mysql2";
import mongoose from "mongoose";
import cors from "cors";
import voiceRouter from "./routes/voice.js";
import chatbotRouter from "./routes/chatbot.js";
import authRouter from "./routes/auth.js";
import contactsRouter from "./routes/contacts.js";
import chatHistoryRouter from "./routes/chatHistory.js";
import sosRouter from "./routes/sos.js";

const app = express();
app.use(cors());
app.use(express.json());

// ── Connect MongoDB ───────────────────────────────────────────────────────────
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sakhisuraksha";
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected!"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// ── Connect MySQL (optional — server runs fine without it) ────────────────────
try {
  const db = mysql.createConnection({
    host:     process.env.DB_HOST     || "localhost",
    user:     process.env.DB_USER     || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME     || "sakhisuraksha",
  });

  db.connect((err) => {
    if (err) {
      console.warn("⚠️  MySQL not connected (DB features disabled):", err.message);
      return;
    }
    console.log("✅ MySQL connected!");
    app.locals.db = db;
  });
} catch (e) {
  console.warn("⚠️  MySQL setup failed:", e.message);
}

// ── Test endpoint ─────────────────────────────────────────────────────────────
app.get("/api/test", (_req, res) => res.json({ message: "Backend working! 🚀" }));

// ── Register Routes ───────────────────────────────────────────────────────────
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/chat-history", chatHistoryRouter);
app.use("/api/voice", voiceRouter);
app.use("/api/chatbot", chatbotRouter);
app.use("/api/sos", sosRouter);

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
