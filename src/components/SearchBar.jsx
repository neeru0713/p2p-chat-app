import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <div className="flex w-[20%]">
      <div className="flex relative items-center ml-2">
        <IoIosSearch className="absolute text-gray-500"/>
        <input
          type="text"
          placeholder="Search"
          // value={query}
          // onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-200 rounded-xl text-xs text-gray-500 py-1 bg-[#f5f5f5]"
        />
      </div>
    </div>
  );
};

export default SearchBar;
