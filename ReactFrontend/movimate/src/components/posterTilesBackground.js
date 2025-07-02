import React, { useMemo, useEffect, useState } from 'react';
import './posterTilesBackground.css';
import api from '../api/axiosConfig';

const ROWS = 5; // Add an extra row for the bottom
const COLS = 16; // More columns for a wider screen
const FALLBACK_POSTER = 'https://via.placeholder.com/90x135?text=No+Image';

function getRandomRowPosters(posters) {
  const arr = [];
  for (let i = 0; i < COLS; i++) {
    arr.push(posters[Math.floor(Math.random() * posters.length)]);
  }
  return arr;
}

const PosterTilesBackground = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    async function fetchPosters() {
      try {
        // Fetch movies from your backend
        const res = await api.get('/movies');
        console.log('Fetched movies:', res.data); // Log the movies array for debugging
        const urls = (res.data || [])
          .map(m => m.poster || m.posterUrl || m.poster_path || m.image || null)
          .filter(Boolean);
        setPosters(urls.length > 0 ? urls : [FALLBACK_POSTER]);
      } catch (e) {
        setPosters([FALLBACK_POSTER]);
      }
    }
    fetchPosters();
  }, []);

  // Memoize the grid so it doesn't reshuffle on every render
  const grid = useMemo(() => {
    if (posters.length === 0) return [];
    return Array.from({ length: ROWS }, () => getRandomRowPosters(posters));
  }, [posters]);

  return (
    <div className="poster-tiles-bg">
      {grid.map((row, rowIdx) => (
        <div className="poster-tiles-row" key={rowIdx}>
          {[...row, ...row].map((poster, colIdx) => (
            <img
              key={colIdx}
              src={poster}
              alt="Movie Poster"
              className="poster-tile"
              draggable="false"
              onError={e => { e.target.onerror = null; e.target.src = FALLBACK_POSTER; }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PosterTilesBackground;
