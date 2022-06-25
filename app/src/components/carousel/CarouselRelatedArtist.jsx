/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import { Typography, Grid, Button } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';

const settings = {
  className: 'center',
  dots: false,
  infinite: true,
  slidesToShow: 3.5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function CarouselRelatedArtist({ artist }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid item sm={1}>
        <Typography variant="subtitle1">Related</Typography>
        <Typography variant="subtitle1">Artist</Typography>
      </Grid>
      <Grid
        item
        xs={10}
        md={10}
        sx={{
          marginLeft: 4,
        }}
      >
        <Slider {...settings}>
          {artist.artworks.map((artwork, index) => (
            <Grid
              key={index}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                display: 'flex !important',
                border: '1px solid #A2A28F',
                maxWidth: '300px',
              }}
            >
              <img
                style={{
                  margin: 0,
                  width: '100%',
                  maxHeight: '180px',
                  marginBottom: '30px',
                }}
                src={artist.artist.photo}
                alt="artist"
              />

              <Typography
                style={{
                  color: '#000',
                  fontSize: '21px',
                  fontWeight: 500,
                  marginBottom: '10px',
                }}
              >
                {artist &&
                  `${artist.artist.first_name} ${artist.artist.last_name}`}
              </Typography>
              <Typography
                style={{
                  fontSize: '15px',
                  marginBottom: '15px',
                }}
              >
                {artist &&
                  `${artist.artist.origin}, ${artist.artist.birthday.slice(
                    0,
                    4
                  )}`}
              </Typography>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: '#A2A28F',
                  color: '#fff',
                  paddingY: 1,
                  fontSize: '16px',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'black',
                  },
                }}
                fullWidth
                // disabled={disabled}
              >
                Follow
              </Button>
            </Grid>
          ))}
        </Slider>
      </Grid>
    </Grid>
  );
}
CarouselRelatedArtist.propTypes = {
  artist: PropTypes.object.isRequired, // artist or artwork
};
