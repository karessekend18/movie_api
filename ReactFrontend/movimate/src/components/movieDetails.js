import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosConfig";
import "./movieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/movies/${id}`);
        setMovie(response.data);
      } catch (err) {
        setError("Movie not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    // Debug: log movie object to check for object rendering issues
    console.log('movie:', movie);
  }, [movie]);

  if (loading) return <div className="movie-details-loading">Loading...</div>;
  if (error) return <div className="movie-details-error">{error}</div>;
  if (!movie) return null;

  return (
    <div className="movie-details-container">
      <div className="movie-details-poster-section">
        <img src={movie.poster} alt={movie.title} className="movie-details-poster" />
      </div>
      <div className="movie-details-info-section">
        <h2 className="movie-details-title" title="View details about this movie">{movie.title}</h2>
        <p className="movie-details-year">{movie.year || (movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : '')}</p>
        {movie.releaseDate && (
          <p className="movie-details-release-date"><b>Release Date:</b> {movie.releaseDate}</p>
        )}
        {movie.genres && movie.genres.length > 0 && (
          <div className="movie-details-meta">
            <span><b>Genres:</b> {movie.genres.join(", ")}</span>
          </div>
        )}
        {movie.synopsis || movie.description ? (
          <p className="movie-details-synopsis">{movie.synopsis || movie.description}</p>
        ) : null}
        {movie.trailerLink && (
          <div className="movie-details-trailer">
            <iframe
              width="360"
              height="215"
              src={`https://www.youtube.com/embed/${movie.trailerLink.substring(movie.trailerLink.length-11)}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
