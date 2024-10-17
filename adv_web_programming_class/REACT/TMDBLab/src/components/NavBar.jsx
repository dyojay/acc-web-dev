import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Button,Link } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const {VITE_TMDB_API_TOKEN} = process.env ;
function NavBar({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/search/movie',
          params: {
            query: searchQuery,
            language: 'en-US',
            page: '1',
            include_adult: 'false'
          },
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${VITE_TMDB_API_TOKEN}`
          }
        };
  
        const response = await axios(options);
        if(response.data.results.length ===0){
          navigate('./Error');
        } else{
        setSearchResults(response.data.results);
        navigate('/search');
        }
      } catch (error) {
        console.error('Error searching movies:', error);
        navigate('/error');
      }
    }
  };
  return (
    <AppBar position="sticky">
      <Toolbar >
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            display: { xs: 'none', sm: 'block' },
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
              textDecoration: 'none',
            },
          }}
        >
          TMDB Movie App
        </Typography>
        <Search>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </Search>
        <Button color="inherit" onClick={handleSearch}>
          Search
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;