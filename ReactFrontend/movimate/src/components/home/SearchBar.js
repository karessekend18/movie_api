import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="searchbar-form">
            <input
                type="text"
                placeholder="Search for a movie..."
                value={query}
                onChange={handleInputChange}
                className="searchbar-input"
            />
            <button type="submit" className="searchbar-button">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
