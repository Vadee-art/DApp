import { Card, CardActionArea, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function LastArtwork({ artworks }) {
  const navigate = useNavigate();
  const l = artworks.length;
  const lastWork = artworks[l - 1];
  return (
    <Grid
      sx={{
        width: '100%',
        paddingLeft: 8,
        paddingRight: 8,
      }}
    >
      {lastWork && (
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          sx={{
            color: 'white',
            backgroundColor: '#000',
            width: '100%',
            padding: 7,
            paddingLeft: 2.5,
          }}
        >
          <Grid item xs={2}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 300,
                lineHeight: 1.3,
                fontSize: '1.4rem',
              }}
            >
              Last
            </Typography>
            <Typography
              sx={{
                fontSize: '1.4rem',
                fontWeight: 300,
              }}
              variant="subtitle1"
            >
              Artwork
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h2" sx={{ fontStyle: 'italic', p: 0 }}>
              {lastWork.artist.firstName}
              {lastWork.artist.lastName}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '0.9rem' }}>
              {lastWork.title}
            </Typography>
            <br />
            <Typography
              variant="subtitle2"
              sx={{
                padding: 0,
                margin: 0,
                fontWeight: 800,
                fontSize: '0.9rem',
              }}
            >
              <Link
                style={{ color: '#A2A28F' }}
                to={`/artworks/${lastWork._id}`}
              >
                Browse work
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="flex-end">
            <Card sx={{ maxWidth: 250, maxHeight: 150 }}>
              <CardActionArea
                onClick={() => navigate.push(`artworks/${lastWork._id}`)}
              >
                <img
                  style={{ height: '100%', width: '100%' }}
                  srcSet={lastWork.image}
                  alt=""
                  loading="lazy"
                />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

LastArtwork.propTypes = {
  artworks: PropTypes.array.isRequired, // artist or artwork
};
