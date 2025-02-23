const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "p2pchat";

router.post("/signup", async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { mobile }] });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ email, mobile, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(201)
      .json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = { router, authMiddleware };
