const Chat = require("../models/Chat");

const getChatsService = async (userId) => {
    const chats = await Chat.find({ participants: { $in: userId } })
      .populate("participants", "id email mobile isOnline");
  
    if (!chats.length) return [];
  
    return chats.map((chat) => {
      const partner = chat.participants.find((p) => p._id.toString() !== userId.toString());
  
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
  
  module.exports = { getChatsService };
