/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import Slider from 'react-slick';
import {
  Typography,
  Grid,
  CardActionArea,
  CardContent,
  Card,
} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CarouselCategoryBySlug({ artworks, slug }) {
  // const navigate = useNavigate();
  //
  const categoryArtworks = artworks.filter(
    (artwork) => artwork.category.slug === slug
  );
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
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
    <>
      <div>
        {categoryArtworks[0] && (
          <Slider {...settings}>
            {categoryArtworks.map((artwork, index) => (
              <Grid
                className="mid-images"
                key={index}
                sx={{ padding: 2, textAlign: 'left', paddingTop: 0 }}
              >
                <Card sx={{ width: 260 }} elevation={0}>
                  <CardActionArea>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={artwork.image}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: '#000',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                        }}
                      >
                        {artwork.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: '#000',
                          fontSize: '1rem',
                          fontWeight: 300,
                          margin: '3px 0px',
                        }}
                      >
                        {artwork.artist._id}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: '#000',
                          fontSize: '1rem',
                          fontWeight: 300,
                          marginBottom: '3px',
                        }}
                      >
                        {artwork.origin.country}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#000',
                          fontSize: '1rem',
                          fontWeight: 300,
                        }}
                        variant="subtitle1"
                      >
                        {artwork.price}
                      </Typography>
                      <Typography variant="subtitle1">
                        {artwork.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/* FIXME:is this part in design? */}
                  {/* <Typography
                    variant="subtitle2"
                    sx={{
                      marginBottom: 3,
                      lineHeight: 1,
                      fontWeight: 'bold',
                    }}
                  >
                    <Link style={{ color: '#99CCCC' }} to="#">
                      Browse Gallery
                    </Link>
                  </Typography> */}
                </Card>
              </Grid>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}
