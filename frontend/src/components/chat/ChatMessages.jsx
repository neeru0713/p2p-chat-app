import React, { useEffect, useState } from "react";
import socket from "../../socket";

const ChatMessages = ({ selectedChat }) => {
  const [messages, setMessages] = useState(selectedChat?.messages || []);

  useEffect(() => {
    setMessages(selectedChat?.messages || []);
  }, [selectedChat]);

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      console.log("newMessage : ", newMessage)
      if (newMessage?.chatId === selectedChat?.id) {
        setMessages((prevMessages) => [...prevMessages, newMessage.content]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [selectedChat]);

  return (
    <div className="p-4">
      {messages.map((msg, index) => (
        <div key={index} className={`p-2 my-2 rounded ${msg.sender === selectedChat?.partnerId ? "bg-gray-200" : "bg-blue-100"}`}>
          <p>{msg}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
