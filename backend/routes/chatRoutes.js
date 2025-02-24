const express = require("express");
const Chat = require("../models/Chat");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/authMiddleware.js");
const router = express.Router();
const Message = require("../models/Message");
const {getChatsController, searchUsersController,createChatController} = require("../controllers/chatController.js")

router.get("/search",authMiddleware, searchUsersController);

router.post("/",authMiddleware, createChatController)


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


