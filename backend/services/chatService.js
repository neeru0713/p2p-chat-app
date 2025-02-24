const Chat = require("../models/Chat");
const User = require("../models/User");

const getChatsService = async (userId) => {
  const chats = await Chat.find({ participants: { $in: userId } }).populate(
    "participants",
    "id email mobile isOnline"
  );

  if (!chats.length) return [];

  return chats.map((chat) => {
    const partner = chat.participants.find(
      (p) => p._id.toString() !== userId.toString()
    );

    return {
      id: chat._id,
      partnerId: partner._id,
      partnerEmail: partner.email,
      partnerMobile: partner.mobile,
      isOnline: partner.isOnline,
      latestMessage: "",
      timestamp: null,
      unreadCount: 0,
    };
  });
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

module.exports = { getChatsService, searchUsersService,createChatService };
