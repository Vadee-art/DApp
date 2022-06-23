/* eslint-disable no-nested-ternary */
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Hidden from '@mui/material/Hidden';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { Typography, Button, Container, Divider, Box } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchOneArtWork } from '../actions/artworkAction';
import { addToCart } from '../actions/cartAction';
import TheTab from '../components/TheTab';
import { favArtist, favArtwork, fetchUserDetails } from '../actions/userAction';
import CarouselArtistArtworks from '../components/carousel/CarouselArtistArtworks';
import CarouselPhotographers from '../components/carousel/CarouselRelatedPhotographers';
import { ARTWORK_UPDATE_RESET } from '../constants/artworkConstants';
import {
  MINT_AND_REDEEM_RESET,
  SIGN_MY_ITEM_RESET,
} from '../constants/lazyFactoryConstants';
import { fetchArtistList } from '../actions/artistAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    marginBottom: 100,
  },
  container: {
    display: 'grid',
  },
  paper: {},
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

const categories = [
  { name: 'Fine Art' },
  { name: 'Documentary' },
  { name: 'Analog' },
  { name: 'Iranian Photographer' },
  { name: 'Woman Photographer' },
  { name: 'Black & White' },
  { name: 'Sephia' },
];
// match params has the id from the router /:workId
function Artwork() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { workId } = useParams();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [priceEth, setPriceEth] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const theArtwork = useSelector((state) => state.theArtwork);
  const {
    error,
    loading: loadingArtwork,
    success: successArtwork,
    artwork,
  } = theArtwork;

  const artistList = useSelector((state) => state.artistList);
  const { artists, success } = artistList;

  const theCart = useSelector((state) => state.theCart);
  const { loading: loadingCart, success: successCart } = theCart;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, success: successUserDetails } = userDetails;

  // loading button
  useEffect(() => {
    if (loadingCart) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingCart]);

  // check user auth
  useEffect(() => {
    dispatch(fetchUserDetails());
    // navigate(`/artworks/${workId}`);
  }, [dispatch, userInfo]);

  // user favorite artwork + reset artist works
  // useEffect(() => {
  //   dispatch({ type: ARTIST_LIST_RESET });
  //   if (user && successArtwork) {
  //     for (let i = 0; i < artwork.favorites.length; i += 1) {
  //       if (artwork.favorites[i] === user._id) {
  //         setIsFav(true);
  //       } else {
  //         setIsFav(true);
  //       }
  //     }
  //   }
  // }, [user, artwork, successArtwork, dispatch]);

  // fetch artwork if not success
  useEffect(() => {
    if (workId) {
      dispatch(fetchOneArtWork(workId));
    }
    // return () => {
    //   dispatch({ type: ARTWORK_DETAILS_RESET });
    // };
  }, [workId]);

  // // quantity = 0
  // useEffect(() => {
  //   if (artwork && artwork.quantity < 1) {
  //     setIsDisabled(true);
  //   } else {
  //     setIsDisabled(false);
  //   }
  // }, [artwork]);

  // convert price to ETH
  useEffect(() => {
    if (artwork && artwork.voucher && artwork.voucher.artwork_id) {
      const convertedPrice = ethers.utils.formatEther(
        artwork.voucher.price_wei
      );
      setPriceEth(convertedPrice);
    }
  }, [artwork]);

  useEffect(() => {
    dispatch(fetchArtistList());
  }, []);

  const onAddToCart = () => {
    dispatch({ type: MINT_AND_REDEEM_RESET });
    dispatch({ type: ARTWORK_UPDATE_RESET });
    dispatch({ type: SIGN_MY_ITEM_RESET });

    dispatch(addToCart(workId));
    navigate(`/cart/shippingAddress/${workId}?title=${artwork.title}`);
  };

  const classes = useStyles();
  const renderElement = () => (
    <Container maxWidth="xl">
      {artwork && artwork.price && (
        <Grid
          sx={{
            width: '100%',
            paddingLeft: 8,
            paddingRight: 8,
          }}
        >
          <Grid container direction="row" justifyContent="space-between">
            <Grid
              container
              justifyContent="flex-end"
              alignItems={window.innerWidth < 600 ? 'center' : 'flex-start'}
              direction="column"
              item
              xs={1.5}
              // xs={12}
              // md={1}
              // sx={{ marginLeft: 3 }}
            >
              <Button
                size="small"
                onClick={() => dispatch(favArtwork(artwork._id))}
                sx={{
                  textTransform: 'none',
                  color: '#000',
                  fontSize: '18px',
                  fontWeight: 300,
                }}
              >
                {isFav ? 'Save' : 'UnSave'}
              </Button>
              <Button
                size="small"
                // onClick={() => dispatch(favArtwork(artwork._id))}
                sx={{
                  color: '#000',
                  fontSize: '18px',
                  fontWeight: 300,
                  textTransform: 'none',
                }}
              >
                View in Room
              </Button>
              <Button
                size="small"
                sx={{
                  color: '#000',
                  fontSize: '18px',
                  fontWeight: 300,
                  textTransform: 'none',
                }}
                onClick={() => dispatch(favArtwork(artwork._id))}
              >
                Share
              </Button>
            </Grid>
            <Grid item xs={7.5} sx={{ textAlign: 'center', margin: 'auto' }}>
              <img
                onLoad={() => setIsImageLoading(true)}
                src={`${artwork.image}`}
                alt="Art work"
                style={{
                  width: '90%',
                  // maxWidth: '500px',
                  height: '600px',
                }}
              />
            </Grid>
            <Grid
              item
              xs={3}
              // xs={12}
              // md={4}
            >
              <Paper
                className={classes.paper}
                // elevation={1}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid
                    item
                    xs={3.5}
                    container
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    // md={2}
                  >
                    <img
                      style={{
                        width: '100%',
                        height: '110px',
                      }}
                      src={artwork.artist && artwork.artist.photo}
                      alt="artist"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={7.5}
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    style={{ paddingLeft: 1 }}
                    //  md
                  >
                    <Typography
                      style={{
                        color: '#000',
                        fontWeight: 300,
                        fontSize: '22px',
                      }}
                    >
                      {artwork.artist &&
                        `${artwork.artist.firstName} ${artwork.artist.lastName}`}
                    </Typography>
                    <Typography
                      style={{
                        color: '#000',
                        fontWeight: 300,
                        fontSize: '16px',
                        marginTop: '18px',
                        marginBottom: '8px',
                      }}
                    >
                      {artwork.artist &&
                        `${
                          artwork.artist.origin
                        }, ${artwork.artist.birthday.slice(0, 4)}`}
                    </Typography>
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      sx={{
                        backgroundColor: '#A2A28F',
                        width: '100%',
                        color: 'black',
                        fontSize: '18px',
                        fontWeight: 500,
                        paddingY: 0.6,
                        '&:hover': {
                          backgroundColor: 'black',
                        },
                      }}
                      disabled={isDisabled}
                      onClick={() => dispatch(favArtist(artwork.artist._id))}
                    >
                      Follow
                    </LoadingButton>
                  </Grid>
                </Grid>
                <Grid>
                  <Divider
                    className={classes.divider}
                    style={{ marginTop: 30, marginBottom: 30 }}
                  />
                  <Typography
                    style={{
                      color: '#000',
                      fontSize: '36px',
                      marginBottom: '30px',
                      fontWeight: 300,
                      fontStyle: 'italic',
                    }}
                  >
                    {artwork.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontSize: '18px',
                      marginTop: '15px',
                      fontWeight: 300,
                    }}
                  >
                    {artwork.year}
                  </Typography>
                  {/* <Typography
                    variant="subtitle1"
                    style={{ fontSize: '18px', marginTop: '20px' }}
                  >
                    {artwork.medium}
                  </Typography> */}
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontSize: '18px',
                      marginTop: '15px',
                      fontWeight: 300,
                    }}
                  >
                    {artwork.width} x {artwork.height}
                    {artwork.unit === '0' && ' in '}
                    {artwork.unit === '1' && ' cm '}
                    {!artwork.unit && ' cm '}
                  </Typography>
                  {artwork.edition_number > 0 && (
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: '18px',
                        marginTop: '15px',
                        fontWeight: 300,
                      }}
                    >
                      {artwork.edition_number} from {artwork.edition_total}
                    </Typography>
                  )}
                  {/* <Typography color="#666666" variant="body2">
                    {`${
                      !artwork.is_sold_out
                        ? artwork.edition_total - artwork.edition_number + 1
                        : 0
                    } Remaining`}
                  </Typography> */}
                </Grid>
                <Divider
                  className={classes.divider}
                  style={{ marginTop: 30, marginBottom: 30 }}
                />
                <Typography
                  // variant="body2"

                  style={{
                    marginTop: 30,
                    marginBottom: 30,
                    fontSize: '25px',
                    fontWeight: 500,
                  }}
                >
                  <span style={{ position: 'absolute' }}>
                    {artwork.voucher.artwork_id
                      ? ` Ξ  ${priceEth}`
                      : `$ ${artwork.price.toLocaleString()}`}
                  </span>
                </Typography>
                {!artwork.is_sold_out && artwork.voucher.signature && (
                  <LoadingButton
                    loading={isLoading}
                    onClick={
                      successUserDetails
                        ? (e) => onAddToCart(e)
                        : () => navigate(`/artworks/${workId}?redirect=/login`)
                    }
                    variant={!successUserDetails ? 'outlined' : 'contained'}
                    type="submit"
                    fullWidth
                    disabled={isDisabled}
                  >
                    {successUserDetails
                      ? 'Purchase Artwork'
                      : 'Login To Purchase'}
                  </LoadingButton>
                )}

                <Link to="/">
                  <Typography variant="subtitle2">{artwork.name}</Typography>
                </Link>
                {/* <Typography variant="subtitle1" color="#666666">
                  <RoomOutlinedIcon />
                  {artwork.art_location}
                </Typography> */}
                {/* <Typography
                  variant="subtitle1"
                  color="#666666"
                  style={{ display: 'flex' }}
                >
                  <MilitaryTechOutlinedIcon />
                  <Dialog />
                </Typography> */}
                <Button
                  variant="contained"
                  style={{
                    bacolor: '#000',
                    color: '#fff',
                    width: '100%',
                    fontSize: '19px',
                    marginTop: '15px',
                  }}
                >
                  Buy
                </Button>
              </Paper>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            sx={{ marginTop: '60px' }}
          >
            <Hidden mdDown>
              <Grid item xs={1.5} sx={{ position: 'relative' }}>
                <Typography
                  sx={{
                    color: '#000',
                    fontSize: '20px',
                    fontWeight: 300,
                    lineHeight: 1.2,
                  }}
                >
                  {artwork && artwork.artist && `${artwork.artist.firstName}`}{' '}
                  <br />
                  {artwork &&
                    artwork.artist &&
                    `${artwork.artist.lastName}`}{' '}
                  <br />
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: '#A2A28F',
                      width: '100%',
                      color: 'black',
                      fontSize: '18px',
                      fontWeight: 300,
                      paddingY: 0.2,
                      marginTop: 3,
                      '&:hover': {
                        backgroundColor: 'black',
                      },
                    }}
                    disabled={isDisabled}
                    onClick={() => dispatch(favArtist(artwork.artist._id))}
                  >
                    Follow
                  </Button>
                </Typography>
              </Grid>
            </Hidden>
            <Grid item xs={10.1} sx={{ marginLeft: 0.4 }}>
              <TheTab artist={artwork.artist} />
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                marginTop: 8,
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
                  Artists
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 300,
                  }}
                >
                  Artworks
                </Typography>
              </Grid>
              <Grid
                item
                // xs={10}
                // md={10}
                xs={10.1}
                sx={{ marginLeft: 0.4 }}
              >
                {artwork && artwork.artist && (
                  <CarouselArtistArtworks artistId={artwork.artist} />
                )}
              </Grid>
            </Grid>
            {/* <Grid sx={{ paddingLeft: 2, paddingRight: 2 }}>
              <RelatedCategory />
            </Grid> */}
            <Grid item xs={12}>
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
                  item
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
              alignItems="center"
              sx={{
                marginTop: 8,
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
                  Similar
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 300,
                  }}
                >
                  Works
                </Typography>
              </Grid>
              <Grid
                item
                // xs={10}
                // md={10}
                xs={10.1}
                sx={{ marginLeft: 0.4 }}
              >
                {artwork && artwork.artist && (
                  <CarouselArtistArtworks artistId={artwork.artist} />
                )}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{
                marginTop: 8,
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
                  Photographers
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
                {artists.artists && (
                  <CarouselPhotographers artists={artists.artists} />
                )}
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      )}
    </Container>
  );

  return (
    <div className={classes.root}>
      <Grid
        container
        // spacing={3}
      >
        {loadingArtwork ? (
          <Loader />
        ) : error ? (
          <Message variant="outlined" severity="error">
            {error}
          </Message>
        ) : (
          renderElement()
        )}
      </Grid>
    </div>
  );
}

export default Artwork;
