import React, {useState, useEffect} from 'react'
import Chats from './Chats';
import ChatArea from './ChatArea';
import { API_URL } from '../../config';
const ChatPage = () => {
  const [chats, setChats] = useState([]); 
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const setMessagesAcross = (msgs) => {
    setMessages(msgs);
  }

  const fetchChats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        const data = await response.json();
        setChats(data);
      } else {
        console.error("Failed to fetch chats");
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
  
    fetchChats();
  }, []);

  // const addChat = (newChat) => {
  //   console.log("New Chat : ", newChat)
  //   setChats((prevChats) => {
  //     if (!prevChats.find((chat) => chat.id === newChat.id)) {
  //       return [newChat, ...prevChats];
  //     }
  //     return prevChats;
  //   });
  // };

  return (
    <div className="chat-page w-full border border-gray-200 shadow shadow-lg min-h-[89vh] max-h-[90vh] flex">
      <Chats chats={chats} setSelectedChat={setSelectedChat} fetchChats={fetchChats} setMessages={setMessagesAcross} messages={messages}/>
      <ChatArea selectedChat={selectedChat} userId={localStorage.getItem("userId")} setMessages={setMessagesAcross} messages={messages}/>
    </div>
  );
}

export default ChatPage