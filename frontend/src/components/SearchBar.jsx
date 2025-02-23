import React, { useState, useRef, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { API_URL } from "../config";


const SearchBar = ({fetchChats}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);


  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };


  const fetchResults = async (searchQuery) => {
    if (!searchQuery) {
      setResults([]);
      setShowModal(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/chat/search?query=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setResults(data);
        setShowModal(true);
      } else {
        console.error(data.message);
        setResults([]);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
      setShowModal(false);
    }
  };


  const debounceFetchResults = debounce(fetchResults, 500);


  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debounceFetchResults(value);
  };


  const handleSelectUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId1: localStorage.getItem("userId"), userId2: userId }),
      });
      const data = await response.json();
      if (response.ok) {
        fetchChats();
      } else {
        console.error(data.message);
      }
      setShowModal(false);
     
    } catch (error) {
      console.error("Error creating chat:", error);
      setShowModal(false);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="w-full">
      <div className="w-full p-2 relative">
        <IoIosSearch className="absolute text-gray-500 top-5 left-4" />
        <input
          type="text"
          placeholder="Search by email or phone number"
          value={query}
          onChange={handleChange}
          className="w-full rounded-xl text-xs text-gray-500 p-3 pl-6 bg-[#f5f5f5]"
        />
        {showModal && results.length > 0 && (
          <div
            ref={modalRef}
            className="absolute bg-white border border-gray-200 rounded-xl shadow-lg mt-2 w-full max-h-60 overflow-y-auto z-10"
          >
            {results.map((user) => (
              <div
                key={user._id}
                className="p-2 cursor-pointer hover:bg-gray-100 text-left"
                onClick={() => handleSelectUser(user._id)}
              >
                <p className="text-xs font-medium">{user.name}</p>
                <p className="text-xs text-gray-800">{user.email} | {user.mobile}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
