import express from "express";
import mongoose from "mongoose";
import Contact from "../models/Contact.js";
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

// ── Get Contacts ─────────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("Get contacts error:", err);
    res.status(500).json({ error: "Server error getting contacts" });
  }
});

// ── Add Contact ──────────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  const { name, phone, relation } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Please enter name and phone number" });
  }

  try {
    const newContact = new Contact({
      user: req.user.id,
      name,
      phone,
      relation: relation || "",
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    console.error("Add contact error:", err);
    res.status(500).json({ error: "Server error adding contact" });
  }
});

// ── Delete Contact ───────────────────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Verify contact belongs to the user
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "User not authorized" });
    }

    await contact.deleteOne();
    res.json({ success: true, message: "Contact removed" });
  } catch (err) {
    console.error("Delete contact error:", err);
    res.status(500).json({ error: "Server error deleting contact" });
  }
});

export default router;
