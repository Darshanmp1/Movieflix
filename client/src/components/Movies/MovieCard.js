import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
  const posterUrl = movie.poster_path && movie.poster_path !== 'N/A'
    ? movie.poster_path
    : 'https://via.placeholder.com/200x300?text=No+Image';

  return (
    <div className="movie-card" onClick={onClick}>
      <img 
        src={posterUrl} 
        alt={movie.title} 
        className="movie-poster"
      />
      <div className="movie-title">{movie.title}</div>
      <div className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</div>
    </div>
  );
};

export default MovieCard;
