/**
 * routes/voice.js
 * ───────────────
 * Voice recognition API endpoint.
 *
 * POST /api/voice
 *   Body: { userId, transcript, language, timestamp }
 *   Response: { success, message }
 *
 * Logs transcripts to the `voice_logs` table (if DB is available)
 * and always responds with success so the frontend is non-blocking.
 */

import express from "express";

const router = express.Router();

/**
 * POST /api/voice
 * Receives a voice transcript from the frontend and logs it.
 */
router.post("/", async (req, res) => {
  const { userId, transcript, language, timestamp } = req.body;

  // Basic validation
  if (!transcript || typeof transcript !== "string") {
    return res.status(400).json({
      success: false,
      message: "Missing or invalid 'transcript' in request body.",
    });
  }

  const logEntry = {
    userId: userId || null,
    transcript: transcript.trim(),
    language: language || "en-US",
    timestamp: timestamp || new Date().toISOString(),
  };

  console.log("🎙  [Voice API] Transcript received:", logEntry);

  // ── Try to persist to database ──────────────────────────────────────────────
  // The db object is set on app.locals by server.js if MySQL is connected.
  const db = req.app.locals.db;

  if (db) {
    try {
      await new Promise((resolve, reject) => {
        db.query(
          `INSERT INTO voice_logs (user_id, transcript, language, created_at)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE transcript = transcript`,
          [
            logEntry.userId,
            logEntry.transcript,
            logEntry.language,
            logEntry.timestamp,
          ],
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });
      console.log("✅ [Voice API] Transcript saved to DB.");
    } catch (dbErr) {
      // Non-fatal — still respond 200 so the frontend doesn't block
      console.warn(
        "⚠️  [Voice API] DB insert failed (table may not exist yet):",
        dbErr.message
      );
    }
  } else {
    console.log(
      "ℹ️  [Voice API] No DB connection — transcript logged to console only."
    );
  }

  // ── Codeword detection (server-side echo) ──────────────────────────────────
  // The primary detection happens on the frontend; this is a secondary check
  // for audit / analytics purposes.
  const storedCodeword = null; // Extend: look up from DB by userId
  let codewordDetected = false;
  if (storedCodeword) {
    codewordDetected = logEntry.transcript
      .toLowerCase()
      .includes(storedCodeword.toLowerCase());
  }

  return res.status(200).json({
    success: true,
    message: "Transcript received.",
    codewordDetected,
    language: logEntry.language,
    receivedAt: logEntry.timestamp,
  });
});

/**
 * GET /api/voice/logs
 * Returns recent voice logs for the authenticated user (optional feature).
 */
router.get("/logs", async (req, res) => {
  const { userId } = req.query;
  const db = req.app.locals.db;

  if (!db) {
    return res.status(503).json({
      success: false,
      message: "Database not available.",
    });
  }

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId query parameter is required.",
    });
  }

  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT id, transcript, language, created_at
         FROM voice_logs
         WHERE user_id = ?
         ORDER BY created_at DESC
         LIMIT 50`,
        [userId],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });

    return res.status(200).json({ success: true, logs: rows });
  } catch (err) {
    console.error("❌ [Voice API] Failed to fetch logs:", err);
    return res.status(500).json({ success: false, message: "Database error." });
  }
});

export default router;
