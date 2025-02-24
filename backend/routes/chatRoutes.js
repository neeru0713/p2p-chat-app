const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware.js");
const router = express.Router();
const Message = require("../models/Message");
const {getChatsController, searchUsersController,createChatController, getMessagesByChatIdController} = require("../controllers/chatController.js")

router.get("/search",authMiddleware, searchUsersController);

router.post("/",authMiddleware, createChatController)

router.get("/", authMiddleware, getChatsController);

router.get("/:chatId/messages", authMiddleware, getMessagesByChatIdController)

module.exports = router;


