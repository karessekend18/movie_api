import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import './SearchBar.css';

const SearchBar = ({ onSearch, movies = [] }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (movies.length > 0) {
            const found = movies.find(m => m.title.toLowerCase() === query.trim().toLowerCase());
            if (found) {
                navigate(`/movie/${found.imdbId}`);
                return;
            }
        }
        // Try to fetch movie by exact title from backend
        try {
            const response = await axios.get(`/movies/by-title`, { params: { title: query.trim() } });
            const movie = response.data;
            if (movie && movie.imdbId) {
                navigate(`/movie/${movie.imdbId}`);
                return;
            } else {
                alert('Movie not found.');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert('Movie not found.');
            }
            // Optionally handle other errors
        }
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
