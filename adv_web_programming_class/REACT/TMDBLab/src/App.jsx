import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Results from "./components/Results";
import Error from "./components/Error";
import axios from "axios";
import { Button, Container } from "@mui/material";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const navigate = useNavigate();

  const {VITE_TMDB_API_TOKEN} = process.env ;

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular',
        params: { language: 'en-US', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${VITE_TMDB_API_TOKEN}`
        }
      };
      const response = await axios(options);
      setPopularMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  const fetchNowPlaying = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/now_playing',
        params: { language: 'en-US', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${VITE_TMDB_API_TOKEN}`
        }
      };
      const response = await axios(options);
      setNowPlayingMovies(response.data.results);
      navigate('/now-playing');
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
    }
  };
  return (
    <Container>
      <NavBar setSearchResults={setSearchResults} />
      <Button variant="contained" onClick={fetchNowPlaying} style={{ margin: '20px 0' }}>
        Now Playing
      </Button>
      <Routes>
        <Route path="/" element={<Results movies={popularMovies} title="Popular Movies" />} />
        <Route path="/search" element={<Results movies={searchResults} title="Search Results" />} />
        <Route path="/now-playing" element={<Results movies={nowPlayingMovies} title="Now Playing" />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Container>
  );
}

export default App;