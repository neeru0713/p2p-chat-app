import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; 
import Avatar from "../Avatar";

const ChatAreaHeader = ({ selectedChat }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
     
      <div className="ChatAreaHeader flex gap-5 py-2 px-4 items-center">
        <Avatar isOnline={selectedChat.isOnline} />
        <h1
          className="cursor-pointer text-blue-500 hover:underline"
          onClick={toggleDrawer}
        >
          {selectedChat.partnerEmail}
        </h1>
      </div>

     
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeDrawer}
        ></div>
      )}

   
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform z-50 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="p-4 relative">

          <button
            className="absolute top-4 left-4 text-gray-600 hover:text-black"
            onClick={closeDrawer}
          >
            <AiOutlineClose size={24} />
          </button>


          <div className="flex flex-col items-center mt-10 gap-6">
            <Avatar size="l" isOnline={selectedChat.isOnline} />
            <div className="flex flex-col gap-2">
              <h2 className="name mt-2 font-semibold">
                {selectedChat.partnerEmail?.split("@")[0]}
              </h2>
              <p className="text-gray-600 text-sm">
                {selectedChat.partnerMobile}
              </p>
              <p className="text-gray-600 text-sm">
                {selectedChat.partnerEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatAreaHeader;
