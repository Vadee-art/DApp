/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageList, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { favArtworkChange, openAuthDialog } from '../../actions/userAction';

export default function ArtworkImageList({ artworks }) {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const handleFavoriteArtwork = (artworkId) => {
    if (!user) {
      dispatch(openAuthDialog('login'));
    } else {
      dispatch(favArtworkChange(artworkId));
    }
  };

  return (
    <ImageList
      variant="masonry"
      cols={window.innerWidth < 800 ? 2 : 3}
      gap={35}
      sx={{
        width: '100%',
      }}
    >
      {artworks &&
        artworks
          .filter((artwork) => artwork.artist.first_name)
          .map((artwork) => (
            <ImageListItem
              key={artwork._id}
              sx={{
                marginBottom: 5,
                opacity: 0.6,
                ':hover': {
                  opacity: 1,
                },
                width: '100%',
                // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                transform: 'translateZ(0)',
              }}
            >
              <ImageListItemBar
                sx={{
                  background: 'transparent',
                }}
                actionPosition="right"
                position="top"
                actionIcon={
                  <IconButton
                    onClick={() => handleFavoriteArtwork(artwork._id)}
                    aria-label={`star ${artwork.title}`}
                    style={{ zIndex: 10 }}
                  >
                    {user &&
                    artwork.favorite_artworks.find(
                      (theUser) => theUser === user.id
                    ) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorder color="primary" />
                    )}
                  </IconButton>
                }
              />
              <Link
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
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
                {artwork.artist &&
                  `${artwork.artist.first_name}  ${artwork.artist.last_name}`}
              </Typography>
              <Typography
                sx={{
                  color: '#000',
                  fontWeight: 300,
                  fontSize: '1rem',
                  width: '100%',
                  margin: 0,
                }}
              >
                {artwork.category ? artwork.category?.name : 'Unknown'}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: '#000',
                  fontWeight: 300,
                  fontSize: '1rem',
                  width: '100%',
                  margin: 0,
                }}
              >
                {artwork && artwork.origin.country}
              </Typography>
              {artwork.price && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    width: '100%',
                    margin: 0,
                    color: '#000',
                    fontSize: '1rem',
                  }}
                >
                  ${artwork.price}
                </Typography>
              )}
            </ImageListItem>
          ))}
    </ImageList>
  );
}

ArtworkImageList.propTypes = {
  artworks: PropTypes.array.isRequired, // artist or artwork
};
