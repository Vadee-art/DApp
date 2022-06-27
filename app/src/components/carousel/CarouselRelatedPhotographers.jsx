/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import { Typography, Grid, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';
import { favArtist } from '../../actions/userAction';

export default function CarouselRelatedPhotograaphers({ artists }) {
  const dispatch = useDispatch();

  const settings = {
    className: 'center',
    dots: false,
    infinite: true,
    slidesToShow: 3.2,
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

  return (
    <Slider {...settings}>
      {artists.map((artist, index) => (
        <Grid
          key={index}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            display: 'flex !important',
            border: '1px solid #A2A28F',
            maxWidth: '300px',
            height: '100px',
          }}
        >
          <Grid item xs={3.5}>
            <img
              style={{
                margin: 0,
                width: '100%',
                height: '105px',
              }}
              src={artist.photo}
              alt="artist"
            />
          </Grid>
          <Grid
            item
            xs={8.5}
            container
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography
              style={{
                color: '#000',
                fontSize: '21px',
                fontWeight: 500,
                marginBottom: '10px',
                paddingTop: '8px',
              }}
            >
              {artist && `${artist.firstName} ${artist.lastName}`}
            </Typography>
            <Typography
              style={{
                fontSize: '15px',
                marginBottom: '15px',
              }}
            >
              {artist &&
                `${artist.origin.country}, ${artist.birthday.slice(0, 4)}`}
            </Typography>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: '#A2A28F',
                color: '#000',
                paddingTop: 1,
                fontSize: '15px',
                fontWeight: 400,
                // lineHeight: '0.4rem',
                '&:hover': {
                  backgroundColor: 'black',
                },
              }}
              fullWidth
              // disabled={disabled}
              onClick={() => dispatch(favArtist(artist._id))}
            >
              Follow
            </Button>
          </Grid>
        </Grid>
      ))}
    </Slider>
  );
}

CarouselRelatedPhotograaphers.propTypes = {
  artists: PropTypes.array.isRequired, // artist or artwork
};
