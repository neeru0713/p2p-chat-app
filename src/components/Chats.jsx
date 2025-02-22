import React from "react";
import { PiChatSlashBold } from "react-icons/pi";
import SearchBar from "./SearchBar";
import Message from "./Message"

const chats = () => {
  return (
    <div className="w-[25%] border border-gray-200 h-screen">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 p-2">
          <PiChatSlashBold className="text-xl" />
          <h2 className="text-xl">chat</h2>
            </div>
              <SearchBar />
              <Message/>
      </div>
    </div>
  );
};

export default chats;
