import React from "react";
import { IoMdSend } from "react-icons/io";

const ChatInput = () => {
  return (
    <div className="py-2 px-10 relative">
      <input
        placeholder="message"
        className="flex w-full rounded-xl text-xs p-2 pl-6 bg-blue-50 py-4"
      />

      <IoMdSend className="absolute top-6 right-12" />
    </div>
  );
};

export default ChatInput;
