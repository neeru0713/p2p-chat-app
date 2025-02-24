const express = require("express");
const Chat = require("../models/Chat");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/authMiddleware.js");
const router = express.Router();
const Message = require("../models/Message");
const {getChatsController} = require("../controllers/chatController.js")

router.get("/search", authMiddleware, async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query is required" });

    const users = await User.find({
      $or: [
        { email: { $regex: query, $options: "i" } },
        { mobile: { $regex: query, $options: "i" } },
      ],
    }).select("-password");

    if (users.length === 0)
      return res.status(404).json({ message: "No users found" });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;

    if (!userId1 || !userId2)
      return res.status(400).json({ message: "Both user IDs are required" });

    let chat = await Chat.findOne({
      participants: { $all: [userId1, userId2] },
    });

    if (!chat) {
      chat = new Chat({ participants: [userId1, userId2] });
      await chat.save();
    }

    res.status(200).json({ message: "Chat created", chat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", authMiddleware, getChatsController);


router.get("/:chatId/messages", authMiddleware, async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId })
      .populate("sender", "email") 
      .populate("recipient", "email") 
      .sort({ timestamp: -1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Error fetching messages", error });
  }
});

module.exports = router;


