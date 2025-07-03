import React from "react";
import './hero.css';
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Hero = ({movies}) => {
    const navigate = useNavigate();

    // Debug: log all movies received by the Hero component
    console.log('Hero movies:', movies);

    function reviews(movieId) {
        navigate(`/Reviews/${movieId}`);
    }

    // Custom navigation buttons

    return (
      <div className='movie-carousel-container'>
        <Carousel
          navButtonsAlwaysVisible
          indicators={false}
          NextIcon={<FontAwesomeIcon icon={faChevronRight} />}
          PrevIcon={<FontAwesomeIcon icon={faChevronLeft} />}
          navButtonsProps={{
            className: 'carousel-nav-btn'
          }}
        >
          {movies.map((movie, i) => {
            const backdrop = (movie.backdrops && movie.backdrops[0]) ? movie.backdrops[0] : 'https://via.placeholder.com/800x450?text=No+Image';
            const poster = movie.poster ? movie.poster : 'https://via.placeholder.com/300x450?text=No+Poster';
            return(
            <Paper key={movie.id || i}>
              <div className = 'movie-card-container'>
                <div className = 'movie-card' style={{"--img": `url(${backdrop})`}}>
                    <div className = 'movie-detail'>
                        <div className = 'movie-poster'>
                            <img src={poster} alt="Movie Poster" />
                        </div>
                        <div className = 'movie-title' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                              onClick={() => navigate(`/movie/${movie.imdbId}`)}
                              style={{ cursor: 'pointer' }}
                              title="View details about this movie"
                            >
                              {movie.title}
                            </span>
                            <button
                              className="movie-details-action-btn"
                              title="View details"
                              onClick={e => { e.stopPropagation(); navigate(`/movie/${movie.imdbId}`); }}
                              style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="gold" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                            </button>
                        </div>
                        <div className="movie-buttons-container">
                            <Link to={`/Trailer/${movie.trailerLink && movie.trailerLink.substring(movie.trailerLink.length-11)}`} >
                                <div className="play-button-icon-container">
                                    <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                                </div>
                                <div className="watch-trailer-text">Watch Trailer</div>
                            </Link>
                            <div className="movie-reviews-button-container">
                                <Button variant="info" onClick={()=> reviews(movie.imdbId)}>Reviews</Button>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </Paper>
          )})}
        </Carousel>
      </div>
    );
}

export default Hero;