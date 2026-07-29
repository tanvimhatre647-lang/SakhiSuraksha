import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post("/sos", async (req, res) => {
  const { name, location, contacts } = req.body;

  if (!name || !location || !contacts || contacts.length === 0) {
    return res.status(400).json({ success: false, msg: "Missing info" });
  }

  // ✅ Use backticks for template literal
  const messageBody = `🚨 SOS Alert!\n${name} needs help!\nLocation: https://maps.google.com/?q=${location.lat},${location.lng}`;

  try {
    // Send SMS to all contacts in parallel
    await Promise.all(
      contacts.map(contact =>
        client.messages.create({
          from: process.env.TWILIO_SMS_NUMBER,
          to: contact.number,
          body: messageBody,
        })
      )
    );

    res.json({ success: true, msg: "SOS sent!" });
  } catch (err) {
    console.error("❌ Twilio Error:", err);
    res.status(500).json({ success: false, msg: "Failed to send SOS" });
  }
});

app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);
