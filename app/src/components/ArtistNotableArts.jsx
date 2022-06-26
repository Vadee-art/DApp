/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, ImageList, Typography } from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ArtistNotableArts({ artist }) {
  return (
    <Grid
      sx={{
        marginBottom: 5,
      }}
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      {artist.artworks && (
        <>
          <Grid item sm={8} md={2}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 300,
                lineHeight: 1,
                fontSize: '1.2rem',
                marginBottom: '5px',
              }}
            >
              Notable
            </Typography>
            <Typography
              sx={{
                fontSize: '1.2rem',
                fontWeight: 300,
              }}
              variant="subtitle1"
            >
              Works
            </Typography>
          </Grid>
          <Grid item xs md>
            <ImageList
              cols={window.innerWidth < 800 ? 2 : 3}
              gap={35}
              sx={{
                width: '100%',
                marginTop: '0px !important',
              }}
            >
              {artist.artworks
                // .slice(0, 6)
                .filter((artwork) => artwork.is_notable)
                .map((artwork) => (
                  <ImageListItem
                    key={artwork._id}
                    sx={{
                      color: '#666666',
                      opacity: 0.8,
                      ':hover': {
                        opacity: 1,
                      },
                    }}
                  >
                    <ImageListItemBar
                      style={{ background: 'transparent' }}
                      actionPosition="right"
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
          </Grid>
        </>
      )}
    </Grid>
  );
}

ArtistNotableArts.propTypes = {
  artist: PropTypes.object.isRequired, // artist or artwork
};
