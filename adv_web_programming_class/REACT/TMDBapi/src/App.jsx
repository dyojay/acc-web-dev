// App.js
import React from "react";
import Home from "./components/Home";
import Error from "./components/Error.jsx";
import Results from "./components/Results.jsx";
import MovieCard from "./components/MovieCard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./App.css";
import { AppBar } from '@mui/material';
import Button from '@mui/material/Button';

function App() {
  const { VITE_TMDB_API_TOKEN } = process.env;
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
          <MovieCard doggy={movie} key={movie.id} className="movie-card" />
        ));
        setMovies(movieArray);
      })
      .catch(err => console.log(err));
  };

  return (
    <Router>
      <div className='App'>
        <div className="container">
          <AppBar/>
          <hr />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/error" element={<Error />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
        <Button onClick={handleClick} variant="contained" color="success">Now Playing</Button>
        <div className="movie-container">
          {movies}
        </div>
      </div>
    </Router>
  );
}

export default App;