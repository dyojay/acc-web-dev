import * as React from 'react';
import {Card,CardContent,CardMedia,Typography,CardActionArea} from '@mui/material';

export default function DogImageCard({imagePath}) {
  return (
    <Card sx={{ maxWidth: 345, margin: " 0 auto" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imagePath}
          alt="Random Dog"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Dog
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
