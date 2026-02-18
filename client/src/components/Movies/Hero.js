import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = ({ movies }) => {
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    if (movies && movies.length > 0) {
      // Select a random movie from the first 5
      const randomMovie = movies[Math.floor(Math.random() * Math.min(5, movies.length))];
      setHeroMovie(randomMovie);
    }
  }, [movies]);

  if (!heroMovie) return null;

  const backdropUrl = heroMovie.backdrop_path && heroMovie.backdrop_path !== 'N/A'
    ? heroMovie.backdrop_path
    : '';

  return (
    <section 
      className="hero" 
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{heroMovie.title}</h1>
        <p className="hero-description">
          {heroMovie.overview ? 
            (heroMovie.overview.length > 200 
              ? heroMovie.overview.substring(0, 200) + '...' 
              : heroMovie.overview)
            : 'No description available'}
        </p>
        <div className="hero-buttons">
          <button className="btn-play">▶ Play</button>
          <button className="btn-info">ℹ More Info</button>
        </div>
      </div>
      <div className="hero-fade"></div>
    </section>
  );
};

export default Hero;
