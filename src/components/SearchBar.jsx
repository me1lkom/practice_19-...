import { useState, useEffect, useRef } from "react";

function SearchBar({ onSearchChange }) {
  const [localQuery, setLocalQuery] = useState("");
  const searchTimeoutRef = useRef(null);


  const handleInputChange = (value) => {
    setLocalQuery(value);


    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      onSearchChange(value);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (searchTimeoutRef.current) {
        searchTimeoutRef.current.abort();
      }
    };
  }, []);

  return (
    <input
      type="text"
      placeholder="Поиск технологий..."
      value={localQuery}
      onChange={(e) => handleInputChange(e.target.value)}
      className="search-input"
    />
  );
}

export default SearchBar;
