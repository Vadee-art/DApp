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
import { favArtwork } from '../actions/userAction';

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
          actionIcon={
            artwork.artist ? (
              <IconButton
                onClick={() => dispatch(favArtwork(artwork._id))}
                aria-label={`star ${artwork.title}`}
                style={{ zIndex: 10, bottom: '70px' }}
              >
                {isFav ? <FavoriteIcon /> : <FavoriteBorder color="primary" />}
              </IconButton>
            ) : (
              <IconButton
                // onClick={() => dispatch(favArtwork(artwork._id))}
                aria-label={`star ${artwork.title}`}
                style={{ zIndex: 10, bottom: '70px' }}
              >
                {/* {isFav ? <FavoriteIcon /> : <FavoriteBorder color="primary" />} */}
              </IconButton>
            )
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
          // variant="subtitle1"
          sx={{
            color: '#000',
            fontWeight: 300,
            fontSize: '1.1rem',
            width: '100%',
            margin: 0,
          }}
        >
          {artwork.category ? artwork.category?.name : 'Unknown'}
          {/* FIXME:artwork.nationality */}
        </Typography>
        <Typography
          // variant="subtitle1"
          sx={{
            color: '#000',
            fontWeight: 300,
            fontSize: '1.1rem',
            width: '100%',
            margin: 0,
          }}
        >
          {artwork.artist ? artwork.artist?.origin : 'Origin'}
          {/* FIXME:artwork.nationality */}
        </Typography>
        {artwork.price && (
          <Typography
            // variant="subtitle1"
            sx={{ width: '100%', margin: 0, color: '#000', fontSize: '1rem' }}
          >
            ${artwork.price}
          </Typography>
        )}
      </ImageListItem>
    </Grid>
  );
}

ArtCard.propTypes = {
  artwork: PropTypes.object.isRequired, // artist or artwork
};
