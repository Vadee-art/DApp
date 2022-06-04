/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, Typography } from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import PropTypes from 'prop-types';

export default function ArtSeriesCard({ data }) {
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
        {data.artist ? (
          <img
            srcSet={
              data.image.includes('default')
                ? 'static/defaultImage.png'
                : `${data.image}?w=161&fit=crop&auto=format 1x,
              ${data.image}?w=161&fit=crop&auto=format&dpr=2 2x`
            }
            alt={data.title}
            loading="lazy"
          />
        ) : (
          <img
            srcSet={
              data.photo.includes('default')
                ? 'static/defaultImage.png'
                : `${data.photo}?w=161&fit=crop&auto=format 1x,
                ${data.photo}?w=161&fit=crop&auto=format&dpr=2 2x`
            }
            alt={data.firstName}
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
          {data.category ? data.category?.name : 'Unknown'}
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
          {data.artist ? data.artist?.origin : 'Origin'}
        </Typography>
        {data.price && (
          <Typography
            sx={{ width: '100%', margin: 0, color: '#000', fontSize: '1rem' }}
          >
            ${data.price}
          </Typography>
        )}
      </ImageListItem>
    </Grid>
  );
}

ArtSeriesCard.propTypes = {
  data: PropTypes.object.isRequired, // artist or artwork
};
