import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import {Routes, Route, useLocation} from 'react-router-dom';
import Home from './components/home/home';
import Header from './components/header/header';
import Trailer from './components/trailer/trailer';
import Reviews from './components/reviews/reviews';
import NotFound from './components/notFound/notFound';
import Login from './components/login/login';
import Register from './components/register/register';
import Watchlist from './components/watchlist';
import MovieDetails from './components/movieDetails';

function App() {

  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState({});
  const [user, setUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const location = useLocation();

  const handleSignOut = () => {
    setUser(null);
    // Optionally, clear session/localStorage or redirect
  };

  const getMovies = async () => {
    try {
      const response = await api.get('/movies');
      console.log(response.data);
      setMovies(response.data);

    } catch(err) {
      console.log(err);
    }
   
  }

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviews || []);
    } catch(err) {
      console.log(err);
    }
  }

  const handleSearch = async (query) => {
    if (!query) {
      setSearchActive(false);
      setSearchResults([]);
      return;
    }
    try {
      const response = await api.get(`/movies/search?query=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
      setSearchActive(true);
    } catch (error) {
      setSearchResults([]);
      setSearchActive(true);
    }
  };

  // Load logged-in user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Load watchlist for logged-in user
  useEffect(() => {
    if (user && user.email) {
      const allWatchlists = JSON.parse(localStorage.getItem('userWatchlists') || '{}');
      setWatchlist(allWatchlists[user.email] || []);
    } else {
      setWatchlist([]);
    }
  }, [user]);

  // Save watchlist for logged-in user
  useEffect(() => {
    if (user && user.email) {
      const allWatchlists = JSON.parse(localStorage.getItem('userWatchlists') || '{}');
      allWatchlists[user.email] = watchlist;
      localStorage.setItem('userWatchlists', JSON.stringify(allWatchlists));
    }
  }, [watchlist, user]);

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="App">
      <Header user={user} onSignOut={handleSignOut} onSearch={handleSearch} movies={movies} />

      <Routes>
        <Route path ="/" element={<Layout />}>
        <Route path ="/" element={<Home movies={searchActive ? searchResults : movies} onSearch={handleSearch} />} />
        <Route path="/watchlist" element={<Watchlist
          watchlist={watchlist}
          allMovies={movies}
          onAddToWatchlist={(movie) => {
            if (!watchlist.some(m => m.id === movie.id)) setWatchlist([...watchlist, movie]);
          }}
          onRemoveFromWatchlist={(movie) => {
            setWatchlist(watchlist.filter(m => m.id !== movie.id));
          }}
        />} />
        <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
        <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/Login" element={<Login onLogin={setUser} />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        </Route>
      
      </Routes>
      
    </div>
  );
}

export default App;
