/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    // maxWidth: '95%',
    position: 'relative',
    // overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      height: 2,
      width: '20px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
      width: '20px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'black',
      width: '20px',
    },
  },
}));

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowBackIosNewIcon
      fontSize="large"
      className={className}
      style={{
        display: 'none',
        height: 0,
        width: 0,
        color: 'black',
        margin: 2,
        // left: 0,
        opacity: '10%',
      }}
      onClick={onClick}
    />
  );
}

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowForwardIosIcon
      fontSize="large"
      className={className}
      style={{
        display: 'block',
        color: 'black',
        margin: 5,
        right: window.innerWidth < 900 ? -50 : -80,
        top: '90px',
        position: 'absolute',
        opacity: '10%',
      }}
      onClick={onClick}
    />
  );
}

export default function CarouselArtistList() {
  const artistList = useSelector((state) => state.artistList);
  const { artists, success: successArtistList } = artistList;

  const settings = {
    className: 'slider variable-width',
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    // variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      {successArtistList && (
        <Slider {...settings} style={{ position: 'unset' }}>
          {artists.artists.map((artist, index) => (
            <div
              className="artworks-images"
              key={index}
              style={{ height: '80px' }}
            >
              <div>
                <img
                  srcSet={artist.photo}
                  alt={artist.firstName}
                  loading="lazy"
                  style={{
                    maxWidth: 100,
                    height: 100,
                    marginBottom: 20,
                  }}
                />
              </div>

              <Typography
                variant="subtitle2"
                sx={{
                  padding: 0,
                  margin: 0,
                  lineHeight: 1,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                <Link style={{ color: 'black' }} to="#">
                  {artist.first_name} {artist.last_name}
                </Link>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  padding: 0,
                  margin: '5px 0px',
                  lineHeight: 1,
                  fontSize: '1rem',
                }}
              >
                {artist.origin.country}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  padding: 0,
                  margin: 0,
                  lineHeight: 1,
                  fontSize: '0.9rem',
                }}
              >
                <Link style={{ color: 'white' }} to={`/artists/${artist._id}`}>
                  View
                </Link>
              </Typography>
            </div>
          ))}
        </Slider>
      )}
    </Grid>
  );
}
