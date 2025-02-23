import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <div className="w-full">
      <div className="w-full p-2 relative">
        <IoIosSearch className="absolute text-gray-500 top-4 left-3"/>
        <input
          type="text"
          placeholder="Search"
          // value={query}
          // onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl text-xs text-gray-500 p-2 pl-6 bg-[#f5f5f5]"
        />
      </div>
    </div>
  );
};

export default SearchBar;
