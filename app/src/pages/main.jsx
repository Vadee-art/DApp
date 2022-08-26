/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import {
  Typography,
  CardActionArea,
  Button,
  Box,
  Container,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import LoadingButton from '@mui/lab/LoadingButton';
import { makeStyles } from '@mui/styles';
import {
  fetchAllArtWorks,
  fetchCategories,
  fetchIsTalentArtist,
} from '../actions/artworkAction';
import CarouselTop from '../components/carousel/CarouselTop';
import CarouselFeaturedCategories from '../components/carousel/CarouselFeaturedCategories';
import CarouselCategoryBySlug from '../components/carousel/CarouselCategoryBySlug';
import CarouselArtistList from '../components/carousel/CarouselArtistList';
import { deployMarketPlace } from '../actions/marketPlaceAction';
import { fetchArtistList } from '../actions/artistAction';
import LastArtwork from '../components/LastArtwork';
import MainSkeleton from '../components/skeleton/MainSkeleton';

const useStyles = makeStyles((theme) => ({
  priceCategories: {
    color: '#000',
    fontWeight: 300,
    fontSize: '1.2rem',
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
const priceFilter = [
  'Under $500',
  'Under $1000',
  'Under $2000',
  'Under $5000',
  'Under $10000',
  'Under $15000',
  'Under $20000',
];
const Main = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [skeleton, setSkeleton] = useState(true);

  const categoryList = useSelector((state) => state.categoryList);
  const {
    categories,
    loading: loadingCategories,
    success: successCategories,
  } = categoryList;

  const artworksList = useSelector((state) => state.artworks);
  const {
    artworks,
    loading: loadingArtworks,
    success: successArtworks,
  } = artworksList;

  const artistList = useSelector((state) => state.artistList);
  const { artists, success: successArtists } = artistList;

  const isTalent = useSelector((state) => state.isTalent);
  const { theTalent, success: successTheTalent } = isTalent;

  const marketPlaceDeployment = useSelector(
    (state) => state.marketPlaceDeployment
  );
  const { loading: loadingMarketDeploy, success: successMarketDeploy } =
    marketPlaceDeployment;

  const theMarketPlace = useSelector((state) => state.theMarketPlace);
  const { marketPlace, loading: loadingMarketPlace } = theMarketPlace;

  const keyword = location.search;

  // loading IconButton
  useEffect(() => {
    if (loadingArtworks || loadingMarketDeploy || loadingCategories) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingArtworks, loadingMarketDeploy, loadingCategories]);

  // artworks
  useEffect(() => {
    dispatch(fetchIsTalentArtist());
    dispatch(fetchAllArtWorks());
    dispatch(fetchArtistList());
    if (!successCategories) {
      dispatch(fetchCategories());
    }

    // return () => {
    //   dispatch({ type: ARTWORK_LIST_RESET });
    // };
  }, [successMarketDeploy, successCategories]);

  // skeleton
  useEffect(() => {
    if (!successTheTalent || !successArtists || !successArtworks) {
      setTimeout(function () {
        setSkeleton(false);
      }, 800);
    } else {
      setSkeleton(true);
    }
  }, [successTheTalent, successArtists, successArtworks]);

  // useEffect(() => {
  //   dispatch(cleanLocalCart());
  //   dispatch({ type: ARTWORK_DETAILS_RESET });
  //   return () => {
  //     dispatch(cleanLocalCart());
  //   };
  // }, [dispatch]);

  //  categories

  console.log('skeleton');
  console.log(skeleton);
  console.log('skeleton');
  return (
    <>
      {skeleton && <MainSkeleton />}
      {!isLoading && (
        <Grid>
          {(!marketPlace || !marketPlace.contract) && !loadingMarketPlace ? (
            <Grid sx={{ margin: 'auto', textAlign: 'center' }}>
              <LoadingButton
                loading={loadingMarketDeploy}
                onClick={() => dispatch(deployMarketPlace())}
                variant="contained"
              >
                Deploy Market Place
              </LoadingButton>
            </Grid>
          ) : (
            <Grid sx={{ minHeight: '100vh' }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ color: '#A2A28F' }}
              >
                <Grid item xs={12} sx={{ width: '100%', marginBottom: 2 }}>
                  {artworks && <CarouselTop artworks={artworks} />}
                </Grid>

                {/* photographers */}
                <Container
                  maxWidth="100%"
                  sx={{
                    backgroundColor: '#d1d3c8',
                    paddingBottom: '25px',
                    margin: 0,
                    marginTop: '20px',
                  }}
                >
                  <Container maxWidth="xl">
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-around"
                      sx={{
                        width: '100%',
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingTop: '20px',
                        marginBottom: 8,
                      }}
                    >
                      <Grid item md={2} xs={12}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#818172',
                            fontWeight: 300,
                            margin: 0,
                          }}
                        >
                          Photographers
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={10}
                        xs={12}
                        sx={{
                          marginTop: 2,
                          // padding: 0,
                        }}
                      >
                        {artists && <CarouselArtistList />}
                      </Grid>
                    </Grid>
                  </Container>
                </Container>

                {/* Categories */}
                <Container maxWidth="xl" style={{ marginTop: '20px' }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    sx={{
                      width: '100%',
                      paddingLeft: 8,
                      paddingRight: 8,
                      paddingTop: '20px',
                      marginBottom: 8,
                    }}
                  >
                    <Grid item md={2} xs={12}>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontSize: '1.4rem',
                          fontWeight: 300,
                          marginBottom: '10px',
                        }}
                      >
                        {window.innerWidth > 900
                          ? 'Featured'
                          : 'Featured Categories'}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontSize: '1.4rem',
                          fontWeight: 300,
                        }}
                      >
                        {window.innerWidth < 900 ? '' : ' Categories'}
                      </Typography>
                    </Grid>
                    <Grid item md={10} xs={12}>
                      {categories && (
                        <CarouselFeaturedCategories categories={categories} />
                      )}
                    </Grid>
                    {/* Categories */}
                    <Grid item xs={12}>
                      <Box
                        component="div"
                        sx={{
                          p: 3,
                          width: '100%',
                          border: '0.5px solid #A2A28F',
                          overflowX: 'hidden',
                          marginTop: 5,
                          paddingLeft: 2.5,
                        }}
                      >
                        <Stack direction="row" spacing={1}>
                          <Grid item xs={12} md={2}>
                            <Typography
                              variant="subtitle1"
                              style={{
                                fontSize: '1.4rem',
                                fontWeight: 300,
                                marginBottom: 5,
                              }}
                            >
                              Start
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              style={{
                                fontSize: '1.4rem',
                                fontWeight: 300,
                              }}
                            >
                              Explore
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            md={10}
                            xs={12}
                            display="flex"
                            justifyContent="space-between"
                          >
                            {categories &&
                              categories.map((category, index) => (
                                <Link
                                  key={index}
                                  className={classes.priceCategories}
                                  to="/"
                                >
                                  {category.name}
                                </Link>
                              ))}
                          </Grid>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                </Container>

                {/* Last artwork */}
                {artworks && (
                  <Container maxWidth="xl">
                    <LastArtwork artworks={artworks} />
                  </Container>
                )}
                {/* Last artwork */}

                {/* Shop by Price Categories */}
                <Container maxWidth="xl">
                  <Grid
                    sx={{
                      width: '100%',
                      paddingLeft: 8,
                      paddingRight: 8,
                      marginTop: 4,
                    }}
                  >
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-around"
                      sx={{
                        marginBottom: 8,
                      }}
                    >
                      <Grid item xs={12}>
                        <Box
                          component="div"
                          sx={{
                            p: 3,
                            width: '100%',
                            border: '0.5px solid #A2A28F',
                            overflowX: 'hidden',
                            marginTop: 5,
                            paddingLeft: 2.5,
                          }}
                        >
                          <Stack direction="row" spacing={1}>
                            <Grid item xs={2}>
                              <Typography
                                variant="subtitle1"
                                style={{
                                  fontSize: '1.4rem',
                                  fontWeight: 300,
                                  marginBottom: 5,
                                }}
                              >
                                Shop By
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                style={{
                                  fontSize: '1.4rem',
                                  fontWeight: 300,
                                  marginBottom: 5,
                                }}
                              >
                                Price
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={10}
                              display="flex"
                              justifyContent="space-between"
                            >
                              {priceFilter.map((priceCat, index) => (
                                <Link
                                  key={index}
                                  className={classes.priceCategories}
                                  to="/"
                                >
                                  {priceCat}
                                </Link>
                              ))}
                            </Grid>
                          </Stack>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
                {/* Shop by Price Categories */}

                {/* Talented photographer */}
                {theTalent && (
                  <Container maxWidth="xl">
                    <Grid
                      sx={{
                        width: '100%',
                        paddingLeft: 8,
                        paddingRight: 8,
                      }}
                    >
                      <Card
                        sx={{
                          border: '0.5px solid #A2A28F',
                          boxShadow: 'none',
                        }}
                      >
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-end"
                          sx={{
                            minHeight: '30vh',
                            width: '100%',
                            padding: 5,
                            paddingLeft: 2.5,
                          }}
                        >
                          <Grid item xs={12} md={5} sx={{ paddingRight: 2.5 }}>
                            <Typography
                              variant="h6"
                              style={{
                                fontWeight: 300,
                              }}
                            >
                              Talented Photographer
                            </Typography>

                            <Typography
                              variant="h3"
                              sx={{
                                fontStyle: 'italic',
                                fontSize: '2.2rem',
                                fontWeight: 300,
                              }}
                            >
                              {theTalent.artist && theTalent.artist.first_name}
                              {theTalent.artist && theTalent.artist.last_name}
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                marginTop: 10,
                                marginBottom: 5,
                                fontSize: '15px',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                maxHeight: '400px',
                                whiteSpace: 'normal',
                                // Addition lines for 2 line or multiline ellipsis
                                display: ' -webkit-box !important',
                                WebkitLineClamp: 8,
                                WebkitBoxOrient: 'vertical',
                                fontWeight: 300,
                              }}
                            >
                              {theTalent.artist && theTalent.artist.biography}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                padding: 0,
                                margin: 0,
                                lineHeight: 1,
                                fontSize: '0.9rem',
                                fontWeight: 500,
                              }}
                            >
                              <Link
                                style={{ color: 'black' }}
                                to={`/artists/${theTalent._id}`}
                              >
                                Browse work
                              </Link>
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={7}
                            display="flex"
                            alignItems="center"
                          >
                            <CardActionArea
                              onClick={() =>
                                navigate.push(`artists/${theTalent._id}`)
                              }
                            >
                              <img
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  maxHeight: '400px',
                                }}
                                srcSet={theTalent.image}
                                alt=""
                                loading="lazy"
                              />
                            </CardActionArea>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  </Container>
                )}
                {/* Talented photographer */}
                {/* Fine Art Category */}
                <Container maxWidth="xl">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    sx={{
                      height: 300,
                      width: '100%',
                      paddingLeft: 8,
                      paddingRight: 8,
                      marginTop: 5,
                    }}
                  >
                    <Grid item xs={2}>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontSize: '1.4rem',
                          fontWeight: 300,
                          marginBottom: '10px',
                        }}
                      >
                        Fine Art
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontSize: '1.4rem',
                          fontWeight: 300,
                        }}
                      >
                        Photography
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      sx={{
                        height: 300,
                        maxHeight: 350,
                      }}
                    >
                      <CarouselCategoryBySlug
                        artworks={artworks}
                        slug="fine-art"
                      />
                    </Grid>
                  </Grid>
                </Container>
                {/* Fine Art Category */}

                {/* Street Category */}
                <Container maxWidth="xl">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    sx={{
                      minHeight: '35vh',
                      width: '100%',
                      paddingLeft: 8,
                      paddingRight: 8,
                      marginTop: 8,
                    }}
                  >
                    <Grid item xs={2}>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontSize: '1.4rem',
                          fontWeight: 300,
                          marginBottom: '10px',
                        }}
                      >
                        Street
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontSize: '1.4rem',
                          fontWeight: 300,
                        }}
                      >
                        Category
                      </Typography>
                    </Grid>
                    <Grid item xs={10} sx={{ maxHeight: 300 }}>
                      {artworks[0] && (
                        <CarouselCategoryBySlug
                          artworks={artworks}
                          slug="street"
                        />
                      )}
                    </Grid>
                  </Grid>
                </Container>
                {/* Street Category */}
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default Main;
