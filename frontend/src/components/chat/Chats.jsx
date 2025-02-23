import React from "react";
import { PiChatSlashBold } from "react-icons/pi";
import SearchBar from "../SearchBar";
import ChatNames from "./ChatNames";

const Chats = ({ chats, setSelectedChat, fetchChats, setMessages, messages }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"))?.email.split('@')[0];

  return (
    <div className="chats w-[30%] border-r border-gray-200 min-h-[89vh] max-h-[90vh] flex flex-col overflow-y-scroll">
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex items-center gap-1 p-2">
          <PiChatSlashBold className="text-xl" />
          <h2 className="text-xl">Chat</h2>
        </div>
        <SearchBar fetchChats={fetchChats}/>
        <ChatNames chats={chats} setSelectedChat={setSelectedChat} setMessages={setMessages}/>
      </div>
      
      <div className="m-4 p-4 border-t rounded-lg border-gray-100 bg-blue-50 text-sm font-semibold text-center">
        Welcome Back {loggedInUser} !
      </div>
    </div>
  );
};

export default Chats;
