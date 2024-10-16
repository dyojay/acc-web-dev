import React from 'react';
import { Typography, Container } from '@mui/material';

function Error() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1">
        We couldn't find the movies you were looking for. Please try again later.
      </Typography>
    </Container>
  );
}

export default Error;