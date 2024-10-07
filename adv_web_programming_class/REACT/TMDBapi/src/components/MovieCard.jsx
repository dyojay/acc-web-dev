import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
export default function Moviecard({doggy}) {
  // https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
  const posterImage = `https://image.tmdb.org/t/p/w200${doggy.poster_path}`
 
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={posterImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {doggy.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {doggy.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}