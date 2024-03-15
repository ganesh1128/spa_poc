import React, { FunctionComponent } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface CardProps {
  height?: string;
  width: string;
  image?: string;
  title: string;
  description?: string;
  onClick?: () => void;
}

const AreaCard: FunctionComponent<CardProps> = ({
  height,
  width,
  image,
  title,
  description,
  onClick
}) => {
  return (
    <Card sx={{ width: width, maxHeight: '175px' }}>
      <CardActionArea onClick={onClick}>
        {
          image && (
            <div style={{ textAlign: 'center' }}>
              <CardMedia
                component="img"
                height={height}
                image={image}
                alt={title}
                style={{ display: 'inline-block', objectFit: 'cover', width: 'auto', marginTop: '15px' }}
              />
          </div>
          )
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AreaCard;
