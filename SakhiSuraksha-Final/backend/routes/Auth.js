import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Middleware to check if MongoDB is connected
const checkDbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: "Database offline. Please make sure MongoDB is running on port 27017, or configure MONGODB_URI in your backend/.env file."
    });
  }
  next();
};

router.use(checkDbConnection);

// ── Register User ────────────────────────────────────────────────────────────
router.post("/register", async (req, res) => {
  const { name, phone, email, password, codeword } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ error: "Please enter all required fields" });
  }

  try {
    // Check if user already exists by phone or email
    const existingUser = await User.findOne({
      $or: [
        { phone },
        ...(email ? [{ email }] : [])
      ]
    });

    if (existingUser) {
      const field = existingUser.phone === phone ? "phone number" : "email";
      return res.status(400).json({ error: `User with this ${field} already exists` });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      email: email || "",
      password: hashedPassword,
      codeword: codeword || "help",
    });

    const savedUser = await newUser.save();

    // Create token
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET || "sakhisuraksha_secret_key_2026",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        phone: savedUser.phone,
        email: savedUser.email,
        codeword: savedUser.codeword,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// ── Login User ───────────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  const { phone, password } = req.body; // 'phone' field can contain email or phone

  if (!phone || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  try {
    // Search user by EITHER phone OR email
    const user = await User.findOne({
      $or: [
        { phone },
        { email: phone }
      ]
    });

    if (!user) {
      return res.status(400).json({ error: "User not found with this phone number or email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "sakhisuraksha_secret_key_2026",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        codeword: user.codeword,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// ── Get Current User Details ─────────────────────────────────────────────────
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Auth me error:", err);
    res.status(500).json({ error: "Server error getting user" });
  }
});

export default router;
