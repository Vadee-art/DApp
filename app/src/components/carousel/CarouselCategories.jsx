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
import { useSelector } from 'react-redux';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

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

export default function CarouselCategories() {
  const navigate = useNavigate();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const settings = {
    className: 'center',
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,

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
      <div style={{ maxWidth: '95%' }}>
        <Slider {...settings}>
          {categories &&
            categories.map(
              (category, index) =>
                category.is_featured && (
                  <Grid
                    className="mid-images"
                    key={index}
                    sx={{
                      pl: 1,
                      pr: 1,
                      textAlign: 'left',
                    }}
                  >
                    <Card sx={{ width: 260 }} elevation={0}>
                      <CardActionArea
                        onClick={() =>
                          navigate(`artworks/categories/${category._id}`)
                        }
                      >
                        <CardMedia
                          sx={{ height: 140 }}
                          image={
                            category.image.includes('default')
                              ? 'static/defaultImage.png'
                              : category.image
                          }
                          title="Contemplative Reptile"
                        />
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              padding: 0,
                              margin: 0,
                              lineHeight: 1,
                              fontSize: '1.3rem',
                              fontWeight: 300,
                              color: 'black',
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
