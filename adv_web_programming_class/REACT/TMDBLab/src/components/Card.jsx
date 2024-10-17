import React, { useState } from 'react';
import { Card as MUICard, CardContent, CardMedia, Typography, IconButton, Collapse, Box, Rating } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Card({ movie }) {
  const [expanded, setExpanded] = useState(false);
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : '/path/to/default/image.jpg';

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <MUICard sx={{ maxWidth: 200, m: 1 }}>
      <CardMedia
        className='MCard'
        component="img"
        height="300"
        image={posterPath}
        alt={movie.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Rating value={Math.round(movie.vote_average / 2)} readOnly max={5} size="small" />
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {movie.overview}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Rating: {Math.round(movie.vote_average * 10) / 10}/10
          </Typography>
        </CardContent>
      </Collapse>
    </MUICard>
  );
}

export default Card;