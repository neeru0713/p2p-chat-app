const express = require("express");
const { authMiddleware } = require("./authRoutes");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to the chat, User ID: ${req.user.id}` });
});

module.exports = router;
