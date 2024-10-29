import { Card, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

export const Loader = () => {
  return (
    <Grid sx={{ borderRadius: 4, width: 225, height: 250 }}>
      <Card sx={{ width: 225, height: 250 }}>
        <CardMedia
          sx={{
            height: 240,
            backgroundPosition: 'unset',
            backgroundPositionX: 'center'
          }}
          image={'https://cdn.dribbble.com/users/2609408/screenshots/6902542/rainbow-loader.gif'}
        />
      </Card>
    </Grid>
  );
};
