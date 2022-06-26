/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import { Typography, Grid, Button } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';

export default function CarouselRelatedArtist({ relatedArtists }) {
  const settings = {
    className: 'center',
    dots: false,
    infinite: true,
    slidesToShow: relatedArtists.length > 2 ? 3 : 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
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
          {relatedArtists.map((artist, index) => (
            <Grid
              key={index}
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{
                display: 'flex !important',
                border: '1px solid #A2A28F',
                maxWidth: '250px',
                maxHeight: '90px',
              }}
            >
              <Grid item xs={4}>
                <img
                  style={{
                    margin: 0,
                    width: '100%',
                    marginBottom: '30px',
                  }}
                  src={artist.photo}
                  alt="artist"
                />
              </Grid>
              <Grid
                item
                xs={8}
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    style={{
                      color: '#000',
                      fontSize: '21px',
                      fontWeight: 500,
                      marginBottom: '10px',
                    }}
                  >
                    {artist && `${artist.first_name} ${artist.last_name}`}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: '15px',
                      marginBottom: '15px',
                    }}
                  >
                    {artist &&
                      `${artist.origin}, ${artist.birthday.slice(0, 4)}`}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    width: '100%',
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: '#A2A28F',
                      color: '#fff',
                      paddingTop: 1,
                      fontSize: '16px',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'black',
                      },
                      width: '100%',
                      maxHeight: '30px',
                    }}
                    fullWidth
                    // disabled={disabled}
                  >
                    Follow
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Slider>
      </Grid>
    </Grid>
  );
}
CarouselRelatedArtist.propTypes = {
  relatedArtists: PropTypes.array.isRequired,
};
