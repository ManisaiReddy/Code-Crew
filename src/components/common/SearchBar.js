import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="mb-4 flex justify-start">
      <input
        type="text"
        placeholder="Search posts..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-72 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-500"
      />
    </div>
  );
};

export default SearchBar;