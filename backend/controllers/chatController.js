const { getChatsService } = require("../services/chatService");

const getChatsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await getChatsService(userId);

    if (chats.length === 0) {
      return res.status(200).json({ message: "No chats available" });
    }

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getChatsController };
