/**
 * routes/chatbot.js
 * ─────────────────
 * AI Chatbot API powered by Google Gemini.
 *
 * Uses the Gemini REST API directly via fetch — no extra npm package needed.
 *
 * POST /api/chatbot
 *   Body: { message, language, history, userId }
 *   Response: { reply, powered_by, language }
 *
 * GET /api/chatbot/health
 *   Response: { status, geminiConfigured, model }
 */

import express from "express";

const router = express.Router();

// ── Gemini REST API config ────────────────────────────────────────────────────
const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// ── Safety-focused system prompt ─────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Sakhi, a compassionate and empathetic AI assistant for SakhiSuraksha — a women's safety app in India.

Your role:
- Provide emotional support, safety advice, and practical guidance to women in distress
- Help users understand their rights and available resources in India
- Guide users to emergency services when needed
- Provide information about nearby help centers, shelters, and legal aid
- Always be calm, non-judgmental, and reassuring

Important rules:
- NEVER dismiss or minimize anyone's safety concern
- If someone is in immediate danger, ALWAYS first say: call 112 (national emergency) or 100 (police)
- Respond in the SAME LANGUAGE as the user's message automatically
- Keep responses concise (2-4 sentences max) and actionable
- Do not discuss politics, religion, or topics unrelated to safety and wellbeing
- Be warm, human, and supportive — not robotic

Emergency numbers in India:
- 112: National Emergency (Police, Fire, Ambulance)
- 100: Police
- 1091 / 181: Women Helpline (24x7)
- 1098: Child Helpline
- 102: Ambulance
- 14567: Senior Citizens Helpline`;

// ── Language code to name map ─────────────────────────────────────────────────
const LANG_NAMES = {
  en: "English", hi: "Hindi", mr: "Marathi", ta: "Tamil",
  te: "Telugu", bn: "Bengali", gu: "Gujarati", kn: "Kannada", pa: "Punjabi",
};

// ── Fallback responses when no API key is configured ─────────────────────────
const FALLBACK = {
  en: [
    "I'm here to help you. You are not alone. For immediate danger, please call 112.",
    "Your safety matters. The Women's Helpline 1091 is available 24/7.",
    "Please stay safe. Would you like information about nearby help centers?",
    "You are brave for reaching out. How can I help you right now?",
  ],
  hi: [
    "मैं आपकी मदद के लिए यहां हूं। आप अकेले नहीं हैं। खतरे के लिए 112 पर कॉल करें।",
    "महिला हेल्पलाइन 1091 पर कॉल करें — वे 24/7 उपलब्ध हैं।",
    "आपकी सुरक्षा हमारी प्राथमिकता है। मैं आपकी कैसे मदद कर सकती हूं?",
  ],
  mr: [
    "मी तुमची मदत करण्यासाठी येथे आहे. तातडीच्या धोक्यासाठी 112 वर कॉल करा.",
    "महिला हेल्पलाइन 1091 वर कॉल करा — ते 24/7 उपलब्ध आहेत.",
  ],
  ta: [
    "நான் உங்களுக்கு உதவ இங்கே இருக்கிறேன். உடனடி அவசரநிலைக்கு 112 ஐ அழைக்கவும்.",
    "பெண்கள் உதவி எண் 1091 — 24/7 கிடைக்கும்.",
  ],
  bn: [
    "আমি আপনাকে সাহায্য করতে এখানে আছি। জরুরি বিপদে 112 নম্বরে কল করুন।",
    "মহিলা হেল্পলাইন 1091 — 24/7 উপলব্ধ।",
  ],
};

function getFallback(language) {
  const lang = (language || "en").slice(0, 2).toLowerCase();
  const list = FALLBACK[lang] || FALLBACK.en;
  return list[Math.floor(Math.random() * list.length)];
}

// ── POST /api/chatbot ─────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  const { message, language = "en", history = [], userId } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ success: false, message: "Missing or invalid 'message'." });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // ── No API key -> use fallback ────────────────────────────────────────────
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.warn("[Chatbot] GEMINI_API_KEY not set — using fallback.");
    return res.json({ success: true, reply: getFallback(language), powered_by: "fallback" });
  }

  // ── Build Gemini multi-turn conversation ──────────────────────────────────
  const lang = (language || "en").slice(0, 2).toLowerCase();
  const langName = LANG_NAMES[lang] || "English";

  const contents = history.slice(-10).map((turn) => ({
    role: turn.role === "bot" ? "model" : "user",
    parts: [{ text: turn.text }],
  }));

  contents.push({
    role: "user",
    parts: [{ text: `[Respond in ${langName}] ${message.trim()}` }],
  });

  const payload = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: {
      temperature: 0.75,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 300,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT",       threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ],
  };

  try {
    const geminiRes = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error(`[Chatbot] Gemini error ${geminiRes.status}:`, errText);
      return res.json({ success: true, reply: getFallback(language), powered_by: "fallback" });
    }

    const data = await geminiRes.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || getFallback(language);

    console.log(`[Chatbot] Gemini (${langName}): ${reply.slice(0, 80)}...`);

    // Log to DB if available
    const db = req.app.locals.db;
    if (db) {
      db.query(
        `INSERT INTO chatbot_logs (user_id, user_message, bot_reply, language, created_at)
         VALUES (?, ?, ?, ?, NOW())`,
        [userId || null, message.trim(), reply, lang],
        (err) => { if (err) console.warn("[Chatbot] DB log failed:", err.message); }
      );
    }

    return res.json({ success: true, reply, powered_by: "gemini", language: lang });

  } catch (err) {
    console.error("[Chatbot] Network error:", err.message);
    return res.json({ success: true, reply: getFallback(language), powered_by: "fallback" });
  }
});

// ── GET /api/chatbot/health ───────────────────────────────────────────────────
router.get("/health", (_req, res) => {
  const key = process.env.GEMINI_API_KEY;
  res.json({
    status: "ok",
    geminiConfigured: Boolean(key) && key !== "your_gemini_api_key_here",
    model: GEMINI_MODEL,
  });
});

export default router;
