import React from 'react'
import Chats from './Chats';
import ChatArea from './ChatArea';
const ChatPage = () => {
  return (
    <div className="w-full border border-gray-200 h-screen shadow shadow-lg">
      <Chats/>
      <ChatArea/>
    </div>
  );
}

export default ChatPage