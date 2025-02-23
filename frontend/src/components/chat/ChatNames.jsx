import React from "react";
import Avatar from "../Avatar";
const ChatNames = () => {
  return (
    <div className="chat-names flex p-4 justify-between">
      <div className="flex gap-3 items-center">
        <Avatar />

        <div className="flex flex-col items-start">
          <h1 className="font-semibold text-sm">Raggu</h1>
          <p className="text-gray-400 text-sm">latest message</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <span className="">8:30 pm</span>
        <span className="flex justify-center items-center rounded-full bg-blue-400 text-white text-xs px-1 py-[0.5]">
          <span className="">2</span>
        </span>
      </div>
    </div>
  );
};

export default ChatNames;
