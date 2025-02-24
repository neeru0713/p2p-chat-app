const {
  getChatsService,
  searchUsersService,
  createChatService,
} = require("../services/chatService");

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

const searchUsersController = async (req, res) => {
  try {
    const { query } = req.query;

    const users = await searchUsersService(query);

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createChatController = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;

    const chat = await createChatService(userId1, userId2);

    res.status(200).json({ message: "Chat created", chat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getChatsController,
  searchUsersController,
  createChatController,
};
