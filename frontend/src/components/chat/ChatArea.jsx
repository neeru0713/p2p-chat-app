import React from "react";
import ChatAreaHeader from "./ChatAreaHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatArea = () => {
  return (
    <div className="chat-area flex flex-col w-[70%] justify-between">
      <ChatAreaHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatArea;
