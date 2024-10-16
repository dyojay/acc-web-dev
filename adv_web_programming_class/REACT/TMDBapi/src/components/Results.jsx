import React from 'react';
import MovieCard from './MovieCard';

const Results = ({ searchResults }) => {
  return (
    <div className="results-container">
      <h2>Search Results</h2>
      <div className="movie-grid">
        {searchResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Results;