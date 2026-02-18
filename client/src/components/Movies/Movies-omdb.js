import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Hero from './Hero';
import MovieRow from './MovieRow';
import MovieModal from './MovieModal';
import './Movies.css';

const Movies = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState({
    trending: [],
    topRated: [],
    popular: [],
    upcoming: [],
    action: [],
    comedy: []
  });
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // OMDb API Configuration
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY || 'YOUR_OMDB_API_KEY';
  const BASE_URL = 'https://www.omdbapi.com';

  // Popular movie searches for different categories
  const movieCategories = {
    trending: ['Dune', 'Oppenheimer', 'Barbie', 'Killers of the Flower Moon', 'Napoleon', 'Wonka', 'Aquaman', 'Migration'],
    topRated: ['The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'Pulp Fiction', 'Forrest Gump', 'Inception', 'The Matrix', 'Goodfellas'],
    popular: ['Avatar', 'Avengers', 'Titanic', 'Star Wars', 'Jurassic Park', 'Spider-Man', 'Iron Man', 'Batman'],
    upcoming: ['Deadpool 3', 'Gladiator 2', 'Inside Out 2', 'Joker 2', 'Venom 3', 'Moana 2', 'Mufasa', 'Snow White'],
    action: ['John Wick', 'Mission Impossible', 'Mad Max', 'Die Hard', 'Terminator', 'Rambo', 'Taken', 'Expendables'],
    comedy: ['The Hangover', 'Superbad', 'Bridesmaids', 'Anchorman', 'Step Brothers', 'Tropic Thunder', 'Dodgeball', '21 Jump Street']
  };

  useEffect(() => {
    console.log('OMDb API Key loaded:', API_KEY && API_KEY !== 'YOUR_OMDB_API_KEY' ? 'Yes' : 'No');
    
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }

    fetchAllMovies();
  }, []);

  const fetchMovieByTitle = async (title) => {
    try {
      const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`);
      if (response.data.Response === 'True') {
        // Convert OMDb format to our format (similar to TMDB)
        return {
          id: response.data.imdbID,
          title: response.data.Title,
          poster_path: response.data.Poster !== 'N/A' ? response.data.Poster : null,
          backdrop_path: response.data.Poster !== 'N/A' ? response.data.Poster : null,
          overview: response.data.Plot !== 'N/A' ? response.data.Plot : 'No description available',
          vote_average: response.data.imdbRating !== 'N/A' ? parseFloat(response.data.imdbRating) : 0,
          release_date: response.data.Released !== 'N/A' ? response.data.Released : 'Unknown',
          genre_ids: response.data.Genre ? response.data.Genre.split(', ') : []
        };
      }
      return null;
    } catch (error) {
      console.error(`Error fetching movie "${title}":`, error.message);
      return null;
    }
  };

  const fetchMoviesByCategory = async (titles) => {
    const movies = await Promise.all(
      titles.map(title => fetchMovieByTitle(title))
    );
    return movies.filter(movie => movie !== null);
  };

  const fetchAllMovies = async () => {
    setLoading(true);
    console.log('🎬 Fetching movies from OMDb API...');
    
    try {
      const [trending, topRated, popular, upcoming, action, comedy] = await Promise.all([
        fetchMoviesByCategory(movieCategories.trending),
        fetchMoviesByCategory(movieCategories.topRated),
        fetchMoviesByCategory(movieCategories.popular),
        fetchMoviesByCategory(movieCategories.upcoming),
        fetchMoviesByCategory(movieCategories.action),
        fetchMoviesByCategory(movieCategories.comedy)
      ]);

      console.log('✅ Movies loaded successfully!');
      console.log(`   Trending: ${trending.length} movies`);
      console.log(`   Top Rated: ${topRated.length} movies`);
      console.log(`   Popular: ${popular.length} movies`);

      setMovies({
        trending,
        topRated,
        popular,
        upcoming,
        action,
        comedy
      });
    } catch (error) {
      console.error('❌ Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movies-page">
      <Navbar user={user} onLogout={handleLogout} />
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner">Loading movies from OMDb...</div>
        </div>
      ) : (
        <>
          <Hero movies={movies.popular} />
          
          <div className="movies-container">
            <MovieRow 
              title="Trending Now" 
              movies={movies.trending} 
              onMovieClick={handleMovieClick}
            />
            <MovieRow 
              title="Top Rated" 
              movies={movies.topRated} 
              onMovieClick={handleMovieClick}
            />
            <MovieRow 
              title="Popular" 
              movies={movies.popular} 
              onMovieClick={handleMovieClick}
            />
            <MovieRow 
              title="Upcoming" 
              movies={movies.upcoming} 
              onMovieClick={handleMovieClick}
            />
            <MovieRow 
              title="Action Movies" 
              movies={movies.action} 
              onMovieClick={handleMovieClick}
            />
            <MovieRow 
              title="Comedy Movies" 
              movies={movies.comedy} 
              onMovieClick={handleMovieClick}
            />
          </div>
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default Movies;
