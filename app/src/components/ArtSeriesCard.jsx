/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, Typography } from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import PropTypes from 'prop-types';

export default function NotableArts({ artwork }) {
  return (
    <Grid
      sx={{
        marginBottom: 5,
        opacity: 0.8,
        ':hover': {
          opacity: 1,
        },
      }}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
    >
      <ImageListItem style={{ color: '#666666' }}>
        <ImageListItemBar
          style={{ background: 'transparent' }}
          actionPosition="right"
        />
        {artwork.artist ? (
          <img
            srcSet={
              artwork.image.includes('default')
                ? 'static/defaultImage.png'
                : `${artwork.image}?w=161&fit=crop&auto=format 1x,
              ${artwork.image}?w=161&fit=crop&auto=format&dpr=2 2x`
            }
            alt={artwork.title}
            loading="lazy"
          />
        ) : (
          <img
            srcSet={
              artwork.photo.includes('default')
                ? 'static/defaultImage.png'
                : `${artwork.photo}?w=161&fit=crop&auto=format 1x,
                ${artwork.photo}?w=161&fit=crop&auto=format&dpr=2 2x`
            }
            alt={artwork.firstName}
            loading="lazy"
          />
        )}

        <Typography
          sx={{
            color: '#000',
            marginTop: '10px',
            fontSize: '1.2rem',
            fontWeight: 600,
            marginBottom: '8px',
          }}
        >
          {artwork.category ? artwork.category?.name : 'Unknown'}
        </Typography>
        <Typography
          sx={{
            color: '#000',
            fontWeight: 300,
            fontSize: '1.1rem',
            width: '100%',
            margin: 0,
          }}
        >
          {artwork.artist ? artwork.artist?.origin : 'Origin'}
        </Typography>
        {artwork.price && (
          <Typography
            sx={{ width: '100%', margin: 0, color: '#000', fontSize: '1rem' }}
          >
            ${artwork.price}
          </Typography>
        )}
      </ImageListItem>
    </Grid>
  );
}

NotableArts.propTypes = {
  artwork: PropTypes.object.isRequired, // artist or artwork
};
