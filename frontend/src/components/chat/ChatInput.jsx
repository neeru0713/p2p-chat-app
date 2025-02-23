import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import socket from "../../socket.js";

const ChatInput = ({ selectedChat, userId }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      chatId: selectedChat.id,
      recipientId: selectedChat.partnerId,
      senderId: userId,
      content: message,
    });

    setMessage(""); 
  };

  return (
    <div className="py-2 px-10 relative">
      <input
        placeholder="Type a message..."
        className="w-full rounded-xl text-sm p-2 pl-6 bg-blue-50 py-4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <IoMdSend className="absolute top-7 right-12 cursor-pointer" onClick={sendMessage} />
    </div>
  );
};

export default ChatInput;
