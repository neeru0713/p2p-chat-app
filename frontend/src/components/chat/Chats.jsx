import React from "react";
import { PiChatSlashBold } from "react-icons/pi";
import SearchBar from "../SearchBar";
import ChatNames from "./ChatNames";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../SocketProvider";
const Chats = ({ chats, setSelectedChat, fetchChats, setMessages }) => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"))?.email.split("@")[0];

  const handleLogout = () => {
    socket.emit("userOffline", (localStorage.getItem("userId")));
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="chats w-[30%] border-r border-gray-200 min-h-[89vh] max-h-[90vh] flex flex-col overflow-y-scroll">
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex items-center gap-1 p-2">
          <PiChatSlashBold className="text-xl" />
          <h2 className="text-xl">Chat</h2>
        </div>
        <SearchBar fetchChats={fetchChats} />
        <ChatNames chats={chats} setSelectedChat={setSelectedChat} setMessages={setMessages} />
      </div>

      {/* Welcome & Logout */}
      <div className="m-3 p-3 border-t rounded-lg border-gray-100 bg-blue-50 text-sm font-semibold text-center flex justify-between items-center">
        <span>Welcome Back, {loggedInUser}!</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Chats;
