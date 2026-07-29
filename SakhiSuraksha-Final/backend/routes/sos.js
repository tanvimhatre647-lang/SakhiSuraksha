import express from "express";
import twilio from "twilio";
import SosLog from "../models/SosLog.js";

const router = express.Router();

// Initialize Twilio client dynamically (safe if credentials aren't set)
let twilioClient = null;
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER } = process.env;

if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
  try {
    twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    console.log("✅ Twilio SMS client initialized successfully!");
  } catch (err) {
    console.warn("⚠️ Twilio initialization failed:", err.message);
  }
} else {
  console.warn("⚠️ Twilio credentials missing in .env (SMS alerts will run in simulation mode).");
}

// ── Send/Log SOS ─────────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  const { name, location, contacts } = req.body;
  const lat = location?.lat || 0;
  const lng = location?.lng || 0;

  console.log(`\n🚨🚨🚨 [SOS TRIGGERED] 🚨🚨🚨`);
  console.log(`User: ${name || "Anonymous"}`);
  console.log(`Coordinates: Latitude ${lat}, Longitude ${lng}`);
  console.log(`Google Maps Link: https://maps.google.com/?q=${lat},${lng}`);
  console.log(`Registered Contacts:`, contacts || []);

  try {
    // 1. Log to MongoDB Atlas
    const newLog = new SosLog({
      userName: name || "Anonymous",
      lat,
      lng,
      contacts: contacts || [],
    });
    const savedLog = await newLog.save();

    // 2. Dispatch Alerts
    if (contacts && contacts.length > 0) {
      const messageBody = `🚨 SOS ALERT from Sakhi Suraksha!\n${name || "User"} is in distress and needs urgent help.\nLocation: https://maps.google.com/?q=${lat},${lng}`;

      if (twilioClient && TWILIO_SMS_NUMBER) {
        console.log(`\n📢 [Real SMS Alerts Dispatching via Twilio]`);
        
        // Dispatch all Twilio messages in parallel
        const smsPromises = contacts.map(async (contact) => {
          const rawPhone = contact.number || contact.phone || "";
          let phone = rawPhone.trim();
          
          if (!phone) return { phone, success: false, error: "Empty phone number" };
          
          // Clean up phone number format (needs +countrycode for Twilio, e.g. +91)
          if (!phone.startsWith("+")) {
            if (phone.length === 10) {
              phone = `+91${phone}`; // Default to India prefix if 10-digit number
            } else {
              phone = `+${phone}`;
            }
          }

          try {
            const twilioRes = await twilioClient.messages.create({
              from: TWILIO_SMS_NUMBER,
              to: phone,
              body: messageBody,
            });
            console.log(`✅ Real SMS sent to ${contact.name || "Contact"} (${phone}). SID: ${twilioRes.sid}`);
            return { phone, success: true };
          } catch (twilioErr) {
            console.error(`❌ Failed to send Twilio SMS to ${phone}:`, twilioErr.message);
            return { phone, success: false, error: twilioErr.message };
          }
        });

        await Promise.all(smsPromises);
        console.log(`\n`);
      } else {
        // Simulation Fallback
        console.log(`\n📢 [SMS Alerts Dispatched (SIMULATION MODE)]`);
        contacts.forEach((contact) => {
          const phone = contact.number || contact.phone || "Unknown Number";
          const contactName = contact.name || "Emergency Contact";
          console.log(
            `✉️  [SIMULATION] Sent SMS to ${contactName} (${phone}): "${messageBody.replace(/\n/g, " ")}"`
          );
        });
        console.log(`\n`);
      }
    } else {
      console.log(`⚠️  No custom emergency contacts registered by user.\n`);
    }

    res.json({
      success: true,
      message: twilioClient ? "SOS logged and real SMS notifications sent!" : "SOS logged (SMS simulated)!",
      logId: savedLog._id,
    });
  } catch (err) {
    console.error("SOS log error:", err.message);
    res.status(500).json({ error: "Server error logging SOS event" });
  }
});

export default router;
