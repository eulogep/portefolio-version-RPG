import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Rechercher..."
      value={query}
      onChange={handleChange}
      className="w-full border p-2 rounded mb-4"
    />
  );
};

export default SearchBar; 