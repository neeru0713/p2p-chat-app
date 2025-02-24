import React, { createContext, useContext, useEffect, useState } from "react";
import connectSocket from "./socket";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) return;

    console.log("Connecting socket...");
    const newSocket = connectSocket(); 
    setSocket(newSocket);

    if (!newSocket) return; 

    newSocket.on("userOnline", (users) => {
      console.log("Received online users:", users);
      setOnlineUsers(users);
    });

    newSocket.on("receiveMessage", (message) => {
      console.log("New message received:", message);
    });
   
  }, [localStorage.getItem('token')]); 

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
export default SocketProvider;
