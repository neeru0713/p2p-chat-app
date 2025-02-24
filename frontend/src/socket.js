import { io } from "socket.io-client";
import { API_URL } from "./config";

let socket = null;

export const connectSocket = () => {
  const token = localStorage.getItem("token");
  if (!token) return null; 

  if (!socket) {
    socket = io(API_URL, {
      auth: { token },
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default connectSocket;
