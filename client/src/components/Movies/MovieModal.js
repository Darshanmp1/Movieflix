import React, { useEffect } from 'react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
  useEffect(() => {
    // Close modal on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!movie) return null;

  const posterUrl = movie.poster_path && movie.poster_path !== 'N/A'
    ? movie.poster_path
    : 'https://via.placeholder.com/250x375?text=No+Image';

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <div className="modal-body">
          <img 
            src={posterUrl} 
            alt={movie.title} 
            className="modal-poster"
          />
          <div className="modal-info">
            <h2>{movie.title}</h2>
            <p>{movie.overview || 'No description available.'}</p>
            <div className="modal-details">
              <p><strong>Release Date:</strong> {movie.release_date || 'N/A'}</p>
              <p><strong>Rating:</strong> {movie.vote_average?.toFixed(1)} ⭐</p>
              {movie.vote_count && (
                <p><strong>Votes:</strong> {movie.vote_count.toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
