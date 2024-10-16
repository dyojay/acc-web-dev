import React from 'react';
import { Card as MUICard, CardContent, CardMedia, Typography } from '@mui/material';

function Card({ movie }) {
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : '/path/to/default/image.jpg';

  return (
    <MUICard>
      <CardMedia
        component="img"
        height="140"
        image={posterPath}
        alt={movie.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.vote_average}
        </Typography>
      </CardContent>
    </MUICard>
  );
}

export default Card;