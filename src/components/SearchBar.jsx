import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    onSearch(author); // Pass the author value to the onSearch function
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          placeholder="Search by author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border rounded-l px-4 py-2 w-80"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

