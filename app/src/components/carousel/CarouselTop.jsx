/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import { Typography, Grid, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/carouselTop.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowForwardIosIcon
      fontSize="large"
      className={className}
      style={{
        display: 'none',
        color: 'black',
        margin: 5,
        right: window.innerWidth < 600 ? -10 : -80,
        position: 'absolute',
        opacity: '10%',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowBackIosNewIcon
      fontSize="large"
      className={className}
      style={{
        display: 'none',
        color: 'black',
        margin: 2,
        left: 0,
      }}
      onClick={onClick}
    />
  );
}

export default function CarouselTop({ artworks }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const theArtworks = artworks.filter((artwork) => artwork.is_carousel);

  return (
    <Slider {...settings} style={{ height: '700px' }}>
      {theArtworks &&
        theArtworks.map((artwork, index) => (
          <div key={index}>
            <div
              loading="lazy"
              style={{
                backgroundImage: `url(${artwork.image})`,
                minWidth: '100%',
                width: '100%',
                height: '700px',
                zIndex: 99,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            />
            <Container maxWidth="xl">
              <Grid
                direction="column"
                justifyContent="center"
                container
                style={{
                  position: 'absolute',
                  top: 0,
                  zIndex: 100,
                  height: '700px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                }}
                sx={{
                  width: '100%',
                  paddingLeft: 8,
                  paddingRight: 8,
                  // marginBottom: 8,
                }}
              >
                <Grid item>
                  <Typography
                    component="p"
                    variant="body2"
                    style={{ fontSize: '1.5rem', fontWeight: 300 }}
                  >
                    VADEE Collection
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h5"
                    component="h5"
                    style={{
                      fontSize: '2.2rem',
                      fontWeight: 400,
                      marginTop: '5px',
                      marginBottom: '10px',
                    }}
                  >
                    {artwork.artist.firstName} {artwork.artist.lastName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h4"
                    component="h4"
                    style={{ fontSize: '2.6rem', fontWeight: 400 }}
                  >
                    {artwork && artwork.category.name}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    variant="subtitle2"
                    // component="p"
                    style={{
                      marginTop: '150px',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                    }}
                  >
                    <Link
                      style={{ color: '#fff' }}
                      to={`artworks/${artwork._id}`}
                    >
                      Browse Works
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </div>
        ))}
    </Slider>
  );
}
