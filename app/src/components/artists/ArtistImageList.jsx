/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, ImageList, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { favArtistChange, openAuthDialog } from '../../actions/userAction';

export default function ArtistImageList({ artists }) {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, success: successUserDetails } = userDetails;

  // fav artist
  const handleFavoriteArtist = (artistId) => {
    if (!user) {
      dispatch(openAuthDialog('login'));
    } else {
      dispatch(favArtistChange(artistId));
    }
  };

  return (
    <ImageList
      variant="masonry"
      cols={window.innerWidth < 800 ? 2 : 3}
      gap={35}
      sx={{
        width: '100%',
        marginTop: '0px !important',
      }}
    >
      {artists &&
        artists.map((artist, index) => (
          <ImageListItem key={index} style={{ color: '#666666' }}>
            <ImageListItemBar
              style={{ background: 'transparent' }}
              actionPosition="right"
              position="top"
              actionIcon={
                <IconButton
                  onClick={() => handleFavoriteArtist(artist._id)}
                  aria-label={`star ${artist.title}`}
                  style={{ zIndex: 10 }}
                >
                  {user &&
                  artist.favorites.find((theUser) => theUser === user.id) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorder color="primary" />
                  )}
                </IconButton>
              }
            />

            <Link
              style={{ position: 'absolute', width: '100%', height: '100%' }}
              to={`/artists/${artist._id}`}
            />
            <img
              srcSet={`${artist.photo}?w=161&fit=crop&auto=format 1x,
                ${artist.photo}?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt={artist.title}
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
              {`${artist.first_name} ${artist.last_name}`}
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
              {artist?.origin.country}
            </Typography>
          </ImageListItem>
        ))}
    </ImageList>
  );
}

ArtistImageList.propTypes = {
  artists: PropTypes.array.isRequired, // artist or artwork
};
