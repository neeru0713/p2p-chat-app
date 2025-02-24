import React, { useState , useEffect} from "react";
import Avatar from "../Avatar";
import { API_URL } from "../../config";

const ChatNames = ({ setSelectedChat, chats, setMessages }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    if (chats.length > 0 && !selectedChatId) {
      handleChatClick(chats[0]); 
    }
  }, [chats]);


  const handleChatClick = async (chat) => {
    setSelectedChatId(chat.id);
    setSelectedChat(chat);
    setMessages([]);

    try {
      const response = await fetch(`${API_URL}/api/chat/${chat.id}/messages`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.ok) {
        const messages = await response.json();
        setMessages(messages);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const formatTimestamp = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
  
    hours = hours % 12 || 12; 
  
    return `${hours}:${minutes.toString().padStart(2, "0")} ${amPm}`;
  };

  return (
    <div>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-names flex px-4 py-2 justify-between cursor-pointer ${
              selectedChatId === chat.id ? "bg-gray-100" : ""
            }`}
            onClick={() => handleChatClick(chat)}
          >
            <div className="flex gap-3 items-center">
              <Avatar isOnline={chat.isOnline}/>
              <div className="flex flex-col items-start">
                <h1 className="font-semibold text-sm">{chat.partnerEmail}</h1>
                <p className="text-gray-400 text-xs text-left">{chat.latestMessageSender}: {chat.latestMessage}</p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center">
              <span className="text-xs text-gray-600">{formatTimestamp(chat.timestamp)}</span>
              {chat.unreadCount > 0 && (
                <span className="flex justify-center items-center rounded-full bg-blue-400 text-white text-xs px-1 py-[0.5]">
                  {chat.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No chats available</p>
      )}
    </div>
  );
};

export default ChatNames;
