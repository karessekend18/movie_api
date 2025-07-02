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

function App() {

  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState({});
  const [user, setUser] = useState(null);
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
      setReviews(singleMovie.reviews);
    } catch(err) {
      console.log(err);
    }
  }



  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="App">
      {/* Only show Header if not on login or register page */}
      {!(location.pathname === '/Login' || location.pathname === '/Register') && (
        <Header user={user} onSignOut={handleSignOut} />
      )}

      <Routes>
        <Route path ="/" element={<Layout />}>
        <Route path ="/" element={<Home movies={movies} />} />
        <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
        <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/Login" element={<Login onLogin={setUser} />} />
        <Route path="/Register" element={<Register />} />
        </Route>
      
      </Routes>
      
    </div>
  );
}

export default App;
