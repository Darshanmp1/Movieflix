import React from 'react';
import MovieCard from './MovieCard';
import './MovieRow.css';

const MovieRow = ({ title, movies, onMovieClick }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="movie-category">
      <h2 className="category-title">{title}</h2>
      <div className="movie-row">
        {movies
          .filter(movie => movie.poster_path)
          .map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={() => onMovieClick(movie)}
            />
          ))}
      </div>
    </section>
  );
};

export default MovieRow;
