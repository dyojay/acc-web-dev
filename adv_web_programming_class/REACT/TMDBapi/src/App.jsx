import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error.jsx";
import Results from "./components/Results.jsx";
import MovieCard from "./components/MovieCard";
import {performSearch} from "./components/NavaBar.jsx"
import Button from '@mui/material/Button';
import ParticleBackground from "./components/ParticleBackground.jsx";
import axios from "axios";
import "./App.css";

function App() {
  const { VITE_TMDB_API_TOKEN } = import.meta.env;
  const [movies, setMovies] = useState([]);

  const handleClick = () => {
    console.log("Clicked");
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing',
      params: { language: 'en-US', page: '1' },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${VITE_TMDB_API_TOKEN}`
      }
    };
    
    axios(options)
      .then(response => {
        console.log(response);
        let movieArray = response.data.results.map((movie) => (
          <MovieCard movie={movie} key={movie.id} className="movie-card" />
        ));
        setMovies(movieArray);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='App-Container'>
      <Router>
        <NavBar />
        <div className='App'>
          <ParticleBackground />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/error" element={<Error />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </div>
          <Button onClick={handleClick} variant="outlined">Now Playing</Button>
          <div className="movie-container">
            {movies}
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;