import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid2 from '@mui/material/Grid2';
import { Card, CardMedia, CardContent, Typography, Button, Collapse } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '150%', // 2:3 aspect ratio for movie posters
  backgroundSize: 'cover',
});

export default function Moviecard({movie}) {
  const [expanded, setExpanded] = useState(false);
  const posterImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Function to truncate overview
  const truncateOverview = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
  };

  return (
    <Grid2 xs={12} sm={6} md={4} lg={3}>
      <StyledCard>
        <StyledCardMedia
          image={posterImage}
          title={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {truncateOverview(movie.overview, 100)}
          </Typography>
          {movie.overview.length > 100 && (
            <>
              <Button size="small" onClick={handleExpandClick}>
                {expanded ? 'Read Less' : 'Read More'}
              </Button>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography paragraph>
                  {movie.overview}
                </Typography>
              </Collapse>
            </>
          )}
        </CardContent>
      </StyledCard>
    </Grid2>
  );
}