import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import socket from "../../socket.js";

const ChatInput = ({ selectedChat, userId, setMessages }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;
    const msgObj = {
        chatId: selectedChat.id,
        recipientId: selectedChat.partnerId,
        senderId: userId,
        content: message,
        timestamp: new Date()
      }

    socket.emit("sendMessage", msgObj);

    setMessages((prevMessages) => [...prevMessages, {...msgObj, sender: {_id: msgObj.senderId}}]);

    setMessage(""); 
  };

  return (
    <div className="py-2 px-10 relative bg-gray-100">
      <input
        placeholder="Type a message..."
        className="w-full rounded-xl text-sm p-2 pl-6 bg-white py-4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <IoMdSend className="absolute top-7 right-12 cursor-pointer" onClick={sendMessage} />
    </div>
  );
};

export default ChatInput;
