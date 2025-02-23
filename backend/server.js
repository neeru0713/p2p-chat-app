const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const { router: authRoutes } = require("./routes/authRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

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
  .catch(err => console.log(err));


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
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.userId}`);

  socket.on("sendMessage", async ({ recipientId, content }) => {
    console.log("")
    const recipientSocket = [...io.sockets.sockets.values()].find(
      (s) => s.userId.toString() === recipientId
    );

    if (recipientSocket) {
      recipientSocket.emit("receiveMessage", { senderId: socket.userId, content });
    } else {
      console.log("User offline. Store the message in DB (Future Implementation)");
    }
  });

  socket.on("disconnect", async () => {
    console.log(`User Disconnected: ${socket.userId}`);
    await User.findByIdAndUpdate(socket.userId, { isOnline: false });
  });
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
