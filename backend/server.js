const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const { router: authRoutes } = require("./routes/authRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const Message = require("./models/Message.js");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const io = new Server(server, {
  cors: { origin: "*" },
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error("Unauthorized");

    socket.userId = user._id;
    user.isOnline = true;
    await user.save();
    next();
  } catch (err) {
    console.error("Socket Authentication Error:", err.message);
    next(new Error("Authentication error"));
  }
});

let onlineUsers = new Set();
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.userId}`);
  socket.on("sendMessage", async ({ chatId, senderId, recipientId, content }) => {
    try {
      const newMessage = new Message({ chatId, sender: senderId, recipient: recipientId, content });
      await newMessage.save();

      const recipientSocket = [...io.sockets.sockets.values()].find(
        (s) => s.userId.toString() === recipientId
      );

      if (recipientSocket) {
        recipientSocket.emit("receiveMessage", { senderId: socket.userId, content, chatId, timestamp: newMessage.timestamp });
      }
    } catch (err) {
      console.error("Error sending message:", err.message);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  socket.on("userOnline", (userId)=>{
    onlineUsers.add(userId);
    io.emit("userOnline", Array.from(onlineUsers));
  })
  
  socket.on("userOffline", (userId)=>{
    onlineUsers.delete(userId);
    io.emit("userOnline", Array.from(onlineUsers));
  })

  socket.on("disconnect", async () => {
    try {
      console.log(`User Disconnected: ${socket.userId}`);
      await User.findByIdAndUpdate(socket.userId, { isOnline: false });
      onlineUsers.delete(socket.userId);
      io.emit("onlineUsers", Array.from(onlineUsers));
    } catch (err) {
      console.error("Error handling disconnect:", err.message);
    }
  });

  socket.on("error", (err) => {
    console.error("Socket Error:", err.message);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
