/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { openAuthDialog } from '../../actions/userAction';

export default function ArtCard({ artwork }) {
  const dispatch = useDispatch();

  const [isFav, setIsFav] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  // favorite artworks
  useEffect(() => {
    if (user) {
      for (let i = 0; i < artwork.favorites.length; i++) {
        if (artwork.favorites[i] === user._id) {
          setIsFav(true);
        } else {
          setIsFav(true);
        }
      }
    }
  }, [user, artwork]);

  const handleFavorite = () => {
    if (!user) {
      dispatch(openAuthDialog('login'));
    } else {
      // dispatch(favArtwork(artwork._id));
    }
  };

  return (
    <ImageListItem style={{ color: '#666666' }}>
      {/* <Grid
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
      > */}
      <ImageListItemBar
        sx={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        }}
        style={{ background: 'transparent' }}
        actionPosition="right"
        position="top"
        actionIcon={
          <IconButton
            onClick={handleFavorite}
            aria-label={`star ${artwork.title}`}
            style={{ zIndex: 10 }}
          >
            {isFav ? <FavoriteIcon /> : <FavoriteBorder color="primary" />}
          </IconButton>
        }
      />
      <Link
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        to={`/artworks/${artwork._id}`}
      />
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
      <Typography
        variant="h6"
        sx={{
          color: '#000',
          marginTop: '10px',
          fontSize: '1.2rem',
          fontWeight: 600,
          marginBottom: 0,
        }}
      >
        {artwork.artist
          ? artwork.artist.first_name + artwork.artist.last_name
          : artwork.first_name + artwork.last_name}
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
        {artwork && artwork.origin.country}
      </Typography>
      {artwork.price && (
        <Typography variant="subtitle1" sx={{ width: '100%', margin: 0 }}>
          ${artwork.price}
        </Typography>
      )}
      {/* </Grid> */}
    </ImageListItem>
  );
}

ArtCard.propTypes = {
  artwork: PropTypes.object.isRequired, // artist or artwork
};
