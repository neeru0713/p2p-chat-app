import React, {useState} from "react";
import ChatAreaHeader from "./ChatAreaHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatArea = ({selectedChat, userId, setMessages, messages }) => {
  
  if (!selectedChat) {
    return (
      <div className="flex items-center justify-center h-full m-auto">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }
  return (
    <div className="chat-area flex flex-col w-[70%] justify-between">
      <ChatAreaHeader selectedChat={selectedChat} />
      <ChatMessages selectedChat={selectedChat} messages={messages} setMessages={setMessages} userId={userId}/>
      <ChatInput selectedChat={selectedChat} userId={userId} setMessages={setMessages} />
    </div>
  );
};

export default ChatArea;
