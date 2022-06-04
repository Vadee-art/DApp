/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Typography, Grid, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchArtistList } from '../../actions/artistAction';

export default function CarouselRelatedArtist() {
  const dispatch = useDispatch();

  const artistList = useSelector((state) => state.artistList);
  const { error, loading, artists, success } = artistList;

  useEffect(() => {
    if (!success) {
      dispatch(fetchArtistList());
    }
  }, [success, dispatch]);

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

  return (
    <Slider {...settings}>
      {success &&
        artists.map((artist, index) => (
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
              src={artist.photo}
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
              {artist && `${artist.firstName} ${artist.lastName}`}
            </Typography>
            <Typography
              style={{
                fontSize: '15px',
                marginBottom: '15px',
              }}
            >
              {artist && `${artist.origin}, ${artist.birthday.slice(0, 4)}`}
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
  );
}
