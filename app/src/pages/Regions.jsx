/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Button, Box, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
import ArtSeriesCard from '../components/ArtSeriesCard';
import CarouselRelatedArtist from '../components/carousel/CarouselRelatedArtist';

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

const Regions = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, success: successCategories } = categoryList;

  const marketPlaceDeployment = useSelector(
    (state) => state.marketPlaceDeployment
  );
  const { success: successMarketDeploy } = marketPlaceDeployment;

  const keyword = location.search;

  // artworks
  useEffect(() => {
    dispatch(fetchIsCarousel());
    dispatch(fetchIsTalentArtist());
    dispatch(fetchAllArtWorks('?last=true'));
    dispatch(fetchMarketPlace());
    return () => {
      dispatch({ type: ARTWORK_LIST_RESET });
    };
  }, [navigate, dispatch, keyword, successMarketDeploy]);

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

  const theArtist = useSelector((state) => state.theArtist);
  const { success, artist } = theArtist;

  useEffect(() => {
    if (!success) {
      dispatch(fetchArtistById(37));
    }
  }, []);

  const classes = useStyles();

  return (
    <Grid sx={{ minHeight: '100vh' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Container
          maxWidth="100%"
          sx={{
            paddingBottom: '25px',
            margin: 0,
            marginTop: '20px',
          }}
        >
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              sx={{
                minHeight: '25vh',
                width: '100%',
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: '20px',
              }}
            >
              <Grid direction="column" item xs={1.5}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#000',
                    fontSize: '22px',
                    fontWeight: 600,
                  }}
                >
                  Turkey
                </Typography>
                <div
                  style={{
                    marginTop: '20px',
                    height: '60px',
                    width: '90px',
                    border: '1px solid red',
                  }}
                />
              </Grid>
              <Grid item xs={7.5}>
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
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Facere magni pariatur illum asperiores nam nulla,
                      explicabo ipsa, distinctio placeat amet, nobis odit
                      perspiciatis corporis possimus mollitia quibusdam porro.
                      Ab, obcaecati! Lorem, ipsum dolor sit amet consectetur
                      adipisicing elit. Esse nihil sunt dolore accusamus
                      dolorum. Blanditiis ea maiores praesentium numquam,
                      eveniet dolorem, reprehenderit dicta exercitationem soluta
                      facere quasi quae vero recusandae.
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
              <Grid xs={3} />
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
              <Grid item xs={1.5}>
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
                xs={10.2}
                // md={10}
                sx={{
                  marginLeft: 0.3,
                }}
              >
                <ImageList
                  justifyContent="space-between"
                  cols={window.innerWidth < 800 ? 2 : 3}
                  gap={35}
                  sx={{
                    width: '100%',
                    marginTop: '0px !important',
                  }}
                >
                  {artist?.artworks?.slice(0, 6).map((artwork) => (
                    <ArtSeriesCard key={artwork?._id} data={artwork} />
                  ))}
                </ImageList>
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
                <Grid item xs={1.5}>
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
                  xs={10.2}
                  display="flex"
                  justifyContent="space-between"
                >
                  {categories &&
                    categories.map((category, index) => (
                      <Button
                        key={index}
                        className={classes.priceCategories}
                        sx={{ textTransform: 'none !important' }}
                      >
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
              <Grid item sm={1.5}>
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
                xs={10.2}
                // md={10}
                sx={{
                  marginLeft: 0.3,
                }}
              >
                <CarouselRelatedArtist />
              </Grid>
            </Grid>
          </Container>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Regions;
