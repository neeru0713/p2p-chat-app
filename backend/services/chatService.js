const Chat = require("../models/Chat");
const User = require("../models/User");
const Message = require("../models/Message");

const getChatsService = async (userId) => {
  const chats = await Chat.find({ participants: { $in: userId } }).populate(
    "participants",
    "id email mobile isOnline"
  );

  if (!chats.length) return [];

  return await Promise.all(
    chats.map(async (chat) => {
      const partner = chat.participants.find(
        (p) => p._id.toString() !== userId.toString()
      );

      const latestMessage = await Message.findOne({ chatId: chat._id })
        .sort({ timestamp: -1 })
        .populate("sender", "email")
        .select("content timestamp sender");

      const senderName = latestMessage?.sender?.email?.split("@")[0];
      return {
        id: chat._id,
        partnerId: partner._id,
        partnerEmail: partner.email,
        partnerMobile: partner.mobile,
        isOnline: partner.isOnline,
        latestMessage: latestMessage ? latestMessage.content : "",
        latestMessageSender: senderName ? senderName : "",
        timestamp: latestMessage ? latestMessage.timestamp : "",
      };
    })
  );
};

const searchUsersService = async (query) => {
  if (!query) throw new Error("Query is required");

  const users = await User.find({
    $or: [
      { email: { $regex: query, $options: "i" } },
      { mobile: { $regex: query, $options: "i" } },
    ],
  }).select("-password");

  return users;
};

const createChatService = async (userId1, userId2) => {
  if (!userId1 || !userId2) throw new Error("Both user IDs are required");

  let chat = await Chat.findOne({
    participants: { $all: [userId1, userId2] },
  });

  if (!chat) {
    chat = new Chat({ participants: [userId1, userId2] });
    await chat.save();
  }

  return chat;
};

const getMessagesByChatIdService = async (chatId) => {
  if (!chatId) throw new Error("Chat ID is required");

  const messages = await Message.find({ chatId })
    .populate("sender", "email")
    .populate("recipient", "email")
    .sort({ timestamp: -1 });

  return messages;
};

module.exports = {
  getChatsService,
  searchUsersService,
  createChatService,
  getMessagesByChatIdService,
};
