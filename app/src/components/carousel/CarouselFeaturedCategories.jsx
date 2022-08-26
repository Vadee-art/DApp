/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import {
  Typography,
  Grid,
  CardActionArea,
  CardContent,
  Card,
  CardMedia,
} from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

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

export default function CarouselFeaturedCategories({ categories }) {
  const navigate = useNavigate();

  const settings = {
    className: 'center',
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3,
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
  return (
    <>
      <div>
        <Slider {...settings}>
          {categories.map(
            (category, index) =>
              category.is_featured && (
                <Grid
                  className="mid-images"
                  key={index}
                  sx={{ padding: 2, textAlign: 'left' }}
                >
                  <Card sx={{ width: 260 }} elevation={0}>
                    <CardActionArea
                      onClick={() =>
                        navigate(`/artworks/?category=${category._id}`)
                      }
                    >
                      <CardMedia
                        sx={{ height: 140 }}
                        image={category.image}
                        title="Contemplative Reptile"
                      />
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            padding: 0,
                            margin: 0,
                            lineHeight: 1,
                            color: 'black',
                            fontWeight: 300,
                          }}
                        >
                          {category.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
          )}
        </Slider>
      </div>
    </>
  );
}
CarouselFeaturedCategories.propTypes = {
  categories: PropTypes.array.isRequired,
};
