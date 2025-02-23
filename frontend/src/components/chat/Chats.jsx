import React from "react";
import { PiChatSlashBold } from "react-icons/pi";
import SearchBar from "../SearchBar";
import ChatNames from "./ChatNames";

const chats = ({chats, setSelectedChat, addChat}) => {
  return (
    <div className="chats w-[30%] border-r border-gray-200 min-h-[90vh] max-h-[95vh]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 p-2">
          <PiChatSlashBold className="text-xl" />
          <h2 className="text-xl">chat</h2>
        </div>
        <SearchBar addChat={addChat} />
        <ChatNames chats={chats} setSelectedChat={setSelectedChat}/>
      </div>
    </div>
  );
};

export default chats;
