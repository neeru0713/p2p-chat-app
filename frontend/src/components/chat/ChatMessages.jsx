import React, { useEffect, useState } from "react";
import { useSocket } from "../../SocketProvider";

const ChatMessages = ({ selectedChat, messages, setMessages, userId }) => {
  const {socket} = useSocket();
  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      if (newMessage?.chatId === selectedChat?.id) {
        newMessage = { ...newMessage, sender: { _id: newMessage.senderId } };
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [selectedChat]);


  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    
    hours = hours % 12 || 12; 
  
    return `${hours}:${minutes} ${ampm}`;
  };
  

  const isSender = (msg) => msg.sender._id === userId;
  return (
    <div className="chat-messages p-4 flex flex-col-reverse space-y-2 overflow-y-scroll bg-gray-100 h-full px-10">
      {messages?.map((msg, index) => {
        return (
          <div
            key={index}
            className={`flex ${
              isSender(msg) ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-2 py-1 max-w-xs rounded-lg relative flex flex-col  ${
                isSender(msg) ? "bg-[#dee9ff]" : "bg-white"
              }`}
            >
              <p className="text-sm text-left">{msg.content}</p>
              <span className="text-xs self-end pr-1 pb-1">
                {formatTime(msg.timestamp)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
