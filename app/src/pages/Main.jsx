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
import { useHistory, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import LoadingButton from '@mui/lab/LoadingButton';
import { makeStyles } from '@mui/styles';
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
import CarouselTop from '../components/carousel/CarouselTop';
import Loader from '../components/Loader';
import CarouselCategories from '../components/carousel/CarouselCategories';
import CarouselCategory from '../components/carousel/CarouselCategory';
import CarouselArtistList from '../components/carousel/CarouselArtistList';
import {
  deployMarketPlace,
  fetchMarketPlace,
} from '../actions/marketPlaceAction';
import { fetchIsTalentArtist } from '../actions/artistAction';

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
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const categoryList = useSelector((state) => state.categoryList);
  const {
    categories,
    loading: loadingCategories,
    success: successCategories,
  } = categoryList;

  const artworksList = useSelector((state) => state.artworks);
  const { artworks, loading: loadingArtworks } = artworksList;

  const isCarousels = useSelector((state) => state.isCarousels);
  const { carousels } = isCarousels;

  const isTalent = useSelector((state) => state.isTalent);
  const { theTalent } = isTalent;

  const marketPlaceDeployment = useSelector(
    (state) => state.marketPlaceDeployment
  );
  const { loading: loadingMarketDeploy, success: successMarketDeploy } =
    marketPlaceDeployment;

  const theMarketPlace = useSelector((state) => state.theMarketPlace);
  const { marketPlace } = theMarketPlace;

  const keyword = history.location.search;

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
    dispatch(fetchIsCarousel());
    dispatch(fetchIsTalentArtist());
    dispatch(fetchAllArtWorks('?last=true'));
    dispatch(fetchMarketPlace());
    return () => {
      dispatch({ type: ARTWORK_LIST_RESET });
    };
  }, [history, dispatch, keyword, successMarketDeploy]);

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
  }, [successCategories, dispatch, history]);

  return (
    <>
      {!isLoading && (
        <Grid>
          {!marketPlace || !marketPlace.contract ? (
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
              {isLoading ? (
                <Grid container>
                  <Loader />
                </Grid>
              ) : (
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ color: '#A2A28F' }}
                >
                  <Grid item xs={12} sx={{ width: '100%', marginBottom: 2 }}>
                    {carousels && <CarouselTop carousels={carousels} />}
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
                        justifyContent="flex-end"
                        sx={{
                          minHeight: '25vh',
                          width: '100%',
                          paddingLeft: 8,
                          paddingRight: 8,
                          paddingTop: '20px',
                        }}
                      >
                        <Grid item xs={2}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: '#818172',
                              fontSize: '1.4rem',
                              fontWeight: 300,
                              margin: 0,
                            }}
                          >
                            Photographers
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          sx={{
                            marginTop: 2,
                            padding: 0,
                          }}
                        >
                          <CarouselArtistList artistId={1} />
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
                      <Grid item xs={2}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontSize: '1.4rem',
                            fontWeight: 300,
                            marginBottom: '10px',
                          }}
                        >
                          Featured
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
                      <Grid item xs={10}>
                        <CarouselCategories />
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
                            <Grid item xs={2}>
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
                              xs={10}
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
                          </Stack>
                        </Box>
                      </Grid>
                    </Grid>
                  </Container>

                  {/* Last artwork */}
                  {artworks && artworks.artist && (
                    <Container maxWidth="xl">
                      <Grid
                        sx={{
                          width: '100%',
                          paddingLeft: 8,
                          paddingRight: 8,
                        }}
                      >
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-end"
                          sx={{
                            color: 'white',
                            backgroundColor: '#000',
                            width: '100%',
                            padding: 7,
                            paddingLeft: 2.5,
                          }}
                        >
                          <Grid item xs={2}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 300,
                                lineHeight: 1.3,
                                fontSize: '1.4rem',
                              }}
                            >
                              Last
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '1.4rem',
                                fontWeight: 300,
                              }}
                              variant="subtitle1"
                            >
                              Artwork
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="h2"
                              sx={{ fontStyle: 'italic', p: 0 }}
                            >
                              {artworks.artist.firstName}
                              {artworks.artist.lastName}
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{ fontSize: '0.9rem' }}
                            >
                              {artworks.title}
                            </Typography>
                            <br />
                            <Typography
                              variant="subtitle2"
                              sx={{
                                padding: 0,
                                margin: 0,
                                fontWeight: 800,
                                fontSize: '0.9rem',
                              }}
                            >
                              <Link
                                style={{ color: '#A2A28F' }}
                                to={`/artworks/${artworks._id}`}
                              >
                                Browse work
                              </Link>
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            display="flex"
                            justifyContent="flex-end"
                          >
                            <Card sx={{ maxWidth: 250, maxHeight: 150 }}>
                              <CardActionArea
                                onClick={() =>
                                  history.push(
                                    `artworks/${
                                      artworks[artworks.length - 1]._id
                                    }`
                                  )
                                }
                              >
                                <img
                                  style={{ height: '100%', width: '100%' }}
                                  srcSet={artworks.image}
                                  alt=""
                                  loading="lazy"
                                />
                              </CardActionArea>
                            </Card>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Container>
                  )}
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
                                xs={10}
                                display="flex"
                                justifyContent="space-between"
                              >
                                {priceFilter.map((priceCat, index) => (
                                  <Button
                                    key={index}
                                    className={classes.priceCategories}
                                    sx={{ textTransform: 'none !important' }}
                                  >
                                    {priceCat}
                                  </Button>
                                ))}
                              </Grid>
                            </Stack>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Container>

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
                            <Grid
                              item
                              xs={12}
                              md={5}
                              sx={{ paddingRight: 2.5 }}
                            >
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
                                {theTalent.firstName} {theTalent.lastName}
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
                                {theTalent.biography}
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
                                  history.push(`artists/${theTalent._id}`)
                                }
                              >
                                <img
                                  style={{
                                    height: '100%',
                                    width: '100%',
                                    maxHeight: '400px',
                                  }}
                                  srcSet={theTalent.photo}
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
                        <CarouselCategory />
                      </Grid>
                    </Grid>
                  </Container>
                  <Container maxWidth="xl">
                    <Grid
                      sx={{
                        width: '100%',
                        paddingLeft: 8,
                        paddingRight: 8,
                      }}
                    >
                      <Grid
                        container
                        direction="column"
                        justifyContent="space-around"
                        alignItems="center"
                        sx={{
                          marginTop: 8,
                          backgroundColor: '#EDEEE9',
                          minHeight: '23vh',
                          width: '100%',
                        }}
                      >
                        <Grid item>
                          <Typography color="primary" variant="h2">
                            Ready to start?
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button
                            size="large"
                            sx={{
                              textTransform: 'none !important',
                              fontSize: '1.2rem',
                            }}
                            color="secondary"
                            variant="text"
                          >
                            Join
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Container>
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
                        <CarouselCategory />
                      </Grid>
                    </Grid>
                  </Container>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default Main;
