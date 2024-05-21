import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/random-movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>CineMatch</h1>
        <button onClick={fetchMovies}>Get Random Movies</button>
      </header>
      <div className="movie-container">
        <div className="movie-grid">
          {movies.map(movie => (
            <div key={movie.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
              <p>{movie.original_title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
