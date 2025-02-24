import React from "react";
import { FaUser } from "react-icons/fa"; // Import user icon from react-icons



const Avatar = ({ name = "", isOnline , size = 'm'}) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <div className={`relative ${size === 'l' ? 'w-20 h-20' : 'w-10 h-10'} `}>
     
      <div
        className={`rounded-full flex justify-center items-center ${size === 'l' ? 'w-20 h-20' : 'w-10 h-10'}  text-white font-semibold bg-[#dee9ff]`}
      >
        {initials ? (
          <span>{initials}</span>
        ) : (
          
            size === 'l' ? (<FaUser className="w-10 h-10" />)  :  (<FaUser className="w-5 h-5" />)
          
        )}
      </div>

    
      {isOnline && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      )}
    </div>
  );
};

export default Avatar;
