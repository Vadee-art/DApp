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

export default function ArtCard({ data }) {
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  // favorite artworks
  useEffect(() => {
    if (user) {
      for (let i = 0; i < data.favorites.length; i++) {
        if (data.favorites[i] === user._id) {
          setIsFav(true);
        } else {
          setIsFav(true);
        }
      }
    }
  }, [user, data]);

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
            data.artist ? (
              <IconButton
                onClick={() => dispatch(favArtwork(data._id))}
                aria-label={`star ${data.title}`}
                style={{ zIndex: 10, bottom: '70px' }}
              >
                {isFav ? <FavoriteIcon /> : <FavoriteBorder color="primary" />}
              </IconButton>
            ) : (
              <IconButton
                // onClick={() => dispatch(favArtwork(data._id))}
                aria-label={`star ${data.title}`}
                style={{ zIndex: 10, bottom: '70px' }}
              >
                {/* {isFav ? <FavoriteIcon /> : <FavoriteBorder color="primary" />} */}
              </IconButton>
            )
          }
        />
        {data.artist ? (
          <Link
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            to={`/artworks/${data._id}`}
          />
        ) : (
          <Link
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            to={`/artists/${data._id}`}
          />
        )}
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
          variant="h6"
          sx={{
            color: '#000',
            marginTop: '10px',
            fontSize: '1.2rem',
            fontWeight: 600,
            marginBottom: 0,
          }}
        >
          {data.artist
            ? data.artist.firstName + data.artist.lastName
            : data.firstName + data.lastName}
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
          {data.category ? data.category?.name : 'Unknown'}
          {/* FIXME:data.nationality */}
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
          {data.artist ? data.artist?.origin : 'Origin'}
          {/* FIXME:data.nationality */}
        </Typography>
        {data.price && (
          <Typography
            // variant="subtitle1"
            sx={{ width: '100%', margin: 0, color: '#000', fontSize: '1rem' }}
          >
            ${data.price}
          </Typography>
        )}
      </ImageListItem>
    </Grid>
  );
}

ArtCard.propTypes = {
  data: PropTypes.object.isRequired, // artist or artwork
};
