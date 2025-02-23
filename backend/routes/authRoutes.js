const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { mobile }] });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ email, mobile, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(201)
      .json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Sign-in successful", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = { router, authMiddleware };
