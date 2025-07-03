import React from "react";
import './watchlist.css';

const Watchlist = ({ watchlist, allMovies, onAddToWatchlist, onRemoveFromWatchlist }) => {
  // Debug: log props to check for object rendering issues
  console.log('watchlist:', watchlist);
  console.log('allMovies:', allMovies);

  return (
    <div className="watchlist-page">
      <div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
        <h2 className="watchlist-title" style={{margin: 0}}>My Watchlist</h2>
      </div>
      {watchlist && watchlist.length > 0 ? (
        <>
          <div className="watchlist-movies">
            {watchlist.map((movie) => (
              <div className="watchlist-movie-card" key={movie.imdbId} onClick={() => window.location.href = `/movie/${movie.imdbId}`} style={{ cursor: 'pointer' }}>
                <img src={movie.poster} alt={movie.title} className="watchlist-movie-poster" />
                <div className="watchlist-movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.year}</p>
                  <button className="watchlist-remove-btn" onClick={e => { e.stopPropagation(); onRemoveFromWatchlist(movie); }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="watchlist-add-section">
            <h3>Add more movies to your watchlist:</h3>
            <div className="watchlist-movies">
              {allMovies && allMovies.length > 0 ? allMovies.filter(movie => !watchlist.some(m => m.imdbId === movie.imdbId)).map((movie) => (
                <div className="watchlist-movie-card" key={movie.imdbId} onClick={() => window.location.href = `/movie/${movie.imdbId}`} style={{ cursor: 'pointer' }}>
                  <img src={movie.poster} alt={movie.title} className="watchlist-movie-poster" />
                  <div className="watchlist-movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <button className="watchlist-add-btn" onClick={e => { e.stopPropagation(); onAddToWatchlist(movie); }}>
                      Add to Watchlist
                    </button>
                  </div>
                </div>
              )) : <div>No movies available.</div>}
            </div>
          </div>
        </>
      ) : (
        <div className="watchlist-empty">
          <div>Your watchlist is empty.</div>
          <div className="watchlist-add-section">
            <h3>Add movies to your watchlist:</h3>
            <div className="watchlist-movies">
              {allMovies && allMovies.length > 0 ? allMovies.map((movie) => (
                <div className="watchlist-movie-card" key={movie.imdbId} onClick={() => window.location.href = `/movie/${movie.imdbId}`} style={{ cursor: 'pointer' }}>
                  <img src={movie.poster} alt={movie.title} className="watchlist-movie-poster" />
                  <div className="watchlist-movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <button className="watchlist-add-btn" onClick={e => { e.stopPropagation(); onAddToWatchlist(movie); }}>
                      Add to Watchlist
                    </button>
                  </div>
                </div>
              )) : <div>No movies available.</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
