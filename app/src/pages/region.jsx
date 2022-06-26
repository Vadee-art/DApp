/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Button, Box, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import ImageList from '@mui/material/ImageList';
import {
  fetchAllArtWorks,
  fetchCategories,
  fetchIsCarousel,
} from '../actions/artworkAction';
import { cleanLocalCart } from '../actions/cartAction';
import {
  ARTWORK_DETAILS_RESET,
  ARTWORK_LIST_RESET,
} from '../constants/artworkConstants';

import { fetchMarketPlace } from '../actions/marketPlaceAction';
import { fetchIsTalentArtist, fetchArtistById } from '../actions/artistAction';
import ArtistNotableArts from '../components/ArtistNotableArts';
import CarouselRelatedArtistOne from '../components/carousel/CarouselRelatedArtist-1';
import ArtworkImageList from '../components/artworks/ArtworkImageList';
import { filterByRegion } from '../actions/filterAction';

const useStyles = makeStyles((theme) => ({
  priceCategories: {
    color: '#000',
    fontWeight: 300,
    fontSize: '1.3rem',
    paddingBottom: 5,
    borderBottom: '1px solid transparent',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'transparent',
      borderBottomColor: theme.palette.secondary.main,
      borderBottomWidth: 1,
      color: theme.palette.secondary.main,
    },
  },
}));

const Region = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { country } = useParams();
  const navigate = useNavigate();
  console.log(country);
  const artworksList = useSelector((state) => state.artworks);
  const { artworks, pages } = artworksList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, success: successCategories } = categoryList;

  const filterOrigin = useSelector((state) => state.filterOrigin);
  const { origins, success: successOrigins } = filterOrigin;

  // artworks
  useEffect(() => {
    dispatch(fetchIsTalentArtist());
    dispatch(fetchAllArtWorks(`?regions=${country}`));
    if (!successOrigins) dispatch(filterByRegion());
    return () => {
      dispatch({ type: ARTWORK_LIST_RESET });
    };
  }, [successOrigins]);

  useEffect(() => {
    dispatch(cleanLocalCart());
    dispatch({ type: ARTWORK_DETAILS_RESET });
    return () => {
      dispatch(cleanLocalCart());
    };
  }, [dispatch]);

  //  categories
  useEffect(() => {
    if (!successCategories) {
      dispatch(fetchCategories());
    }
  }, [successCategories, dispatch, navigate]);

  const artworksByRegion =
    artworks[0] && artworks.filter((artwork) => artwork.is_notable);

  const theOrigin =
    country &&
    successOrigins &&
    origins.origins.find((origin) => origin.country === country);

  const classes = useStyles();
  return (
    <Grid sx={{ minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {theOrigin && artworksByRegion && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              sx={{
                minHeight: '25vh',
                width: '100%',
                paddingTop: '20px',
              }}
            >
              <Grid container direction="column" item xs={2}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#000',
                    fontSize: '22px',
                    fontWeight: 600,
                  }}
                >
                  {country.toUpperCase()}
                </Typography>
                <img
                  srcSet={`${theOrigin.flag}?w=161&fit=crop&auto=format 1x,
                  ${theOrigin.flag}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  alt={theOrigin.name}
                  loading="lazy"
                  style={{ maxWidth: '60px' }}
                />
              </Grid>
              <Grid item xs={10}>
                <Box>
                  <span>
                    <Typography
                      style={{
                        color: '#000',
                        fontSize: '19px',
                        fontWeight: 300,
                        lineHeight: 1.8,
                        maxHeight: '400px',
                        overflowY: 'hidden',
                      }}
                    >
                      {theOrigin.description}
                    </Typography>
                    <Typography
                      style={{
                        color: '#99CCCC',
                        fontSize: '19px',
                        fontWeight: 400,
                        lineHeight: 1.8,
                      }}
                    >
                      {` Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Facere magni pariatur illum asperiores nam nulla,
                        explicabo ipsa, distinctio placeat amet, nobis odit
                        perspiciatis corporis possimus mollitia quibusdam porro.
                        Ab, obcaecati! Lorem, ipsum dolor sit amet consectetur
                        adipisicing elit. Esse nihil sunt dolore accusamus
                        dolorum. Blanditiis ea maiores praesentium numquam,
                        eveniet dolorem, reprehenderit dicta exercitationem soluta
                        facere quasi quae vero recusandae.`.length > 300
                        ? '... Read more'
                        : ''}
                    </Typography>
                  </span>
                </Box>
              </Grid>
              <Grid item xs={3} />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              sx={{
                marginTop: 15,
                paddingLeft: 8,
                paddingRight: 8,
              }}
            >
              <Grid item xs={2}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 300,
                    lineHeight: 1.3,
                    fontSize: '1.4rem',
                    marginBottom: '5px',
                  }}
                >
                  Notable
                </Typography>
                <Typography
                  sx={{
                    fontSize: '1.4rem',
                    fontWeight: 300,
                  }}
                  variant="subtitle1"
                >
                  Works
                </Typography>
              </Grid>
              <Grid
                item
                md={10}
                sx={{
                  marginLeft: 0,
                }}
              >
                {artworks && <ArtworkImageList artworks={artworksByRegion} />}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                marginTop: 15,
                marginBottom: 15,
                paddingLeft: 8,
                paddingRight: 8,
              }}
            >
              <Box
                component="div"
                sx={{
                  p: 3,
                  width: '100%',
                  border: '0.5px solid #A2A28F',
                  overflowX: 'hidden',
                  marginTop: 5,
                  paddingLeft: 0.5,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Grid item xs={2}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 300,
                      lineHeight: 1.3,
                      marginBottom: 5,
                    }}
                  >
                    Related
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 300,
                    }}
                  >
                    Categories
                  </Typography>
                </Grid>
                <Grid
                  sx={{
                    marginLeft: 0.3,
                  }}
                  item
                  xs={10}
                  display="flex"
                  justifyContent="space-between"
                >
                  {categories &&
                    categories.map((category, index) => (
                      <Button key={index} className={classes.priceCategories}>
                        {category.name}
                      </Button>
                    ))}
                </Grid>
              </Box>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{
                marginTop: 10,
                paddingLeft: 8,
                paddingRight: 8,
              }}
            >
              <Grid item sm={2}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 300,
                    lineHeight: 1.3,
                    marginBottom: 5,
                  }}
                >
                  Related
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 300,
                  }}
                >
                  Artists
                </Typography>
              </Grid>
              <Grid
                item
                md={10}
                sx={{
                  marginLeft: 0.3,
                }}
              >
                {/* <CarouselRelatedArtistOne relatedArtists={relatedArtists} /> */}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </Grid>
  );
};

export default Region;
