import React from 'react'
import Chats from './Chats';
import ChatArea from './ChatArea';
const ChatPage = () => {
  return (
    <div className="chat-page w-full border border-gray-200 shadow shadow-lg min-h-[90vh] max-h-[95vh] flex">
      <Chats/>
      <ChatArea/>
    </div>
  );
}

export default ChatPage