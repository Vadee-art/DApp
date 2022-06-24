/* eslint-disable no-nested-ternary */
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Hidden from '@mui/material/Hidden';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { Typography, Button, Container, Divider } from '@mui/material';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchOneArtWork } from '../actions/artworkAction';
import { addToCart } from '../actions/cartAction';
import Dialog from '../components/Dialog';
import TheTab from '../components/TheTab';
import { favArtwork, fetchUserDetails } from '../actions/userAction';
import CarouselArtistArtworks from '../components/carousel/CarouselArtistArtworks';
import RelatedCategory from '../components/carousel/RelatedCategory';
// import CarouselArtist from '../components/carousel/CarouselArtist';
import { ARTIST_LIST_RESET } from '../constants/artistConstants';
import {
  ARTWORK_DETAILS_RESET,
  ARTWORK_UPDATE_RESET,
} from '../constants/artworkConstants';
import {
  MINT_AND_REDEEM_RESET,
  SIGN_MY_ITEM_RESET,
} from '../constants/lazyFactoryConstants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    marginBottom: 100,
  },
  container: {
    display: 'Grid',
  },
  paper: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '16px',
    paddingBottom: '16px',
    marginLeft: theme.spacing(2),
  },
}));

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

  // fetch artwork if not success
  useEffect(() => {
    if (workId) {
      dispatch(fetchOneArtWork(workId));
    }
  }, [dispatch, workId]);

  // quantity = 0
  useEffect(() => {
    if (artwork && artwork.quantity < 1) {
      setIsDisabled(true);
    }
    if (
      artwork &&
      !artwork.is_sold_out &&
      artwork.voucher &&
      artwork.voucher.signature
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [artwork]);

  // convert price to ETH
  useEffect(() => {
    if (artwork && artwork.voucher && artwork.voucher.artwork_id) {
      const convertedPrice = ethers.utils.formatEther(
        artwork.voucher.price_wei
      );
      setPriceEth(convertedPrice);
    }
  }, [artwork]);

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
        <>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            sx={{ mt: 4 }}
          >
            <Grid
              container
              justifyContent="flex-end"
              alignItems={window.innerWidth < 600 ? 'center' : 'flex-start'}
              direction="column"
              item
              xs={12}
              md={1}
              sx={{ marginLeft: 2, marginRight: 2 }}
            >
              <Grid>
                <Button
                  size="small"
                  onClick={() => dispatch(favArtwork(artwork._id))}
                  sx={{
                    fontSize: 15,
                    textTransform: 'none',
                    textAlign: 'left',
                  }}
                >
                  {isFav ? 'Save' : 'UnSave'}
                </Button>
              </Grid>
              <Grid>
                <Button
                  size="small"
                  sx={{
                    fontSize: 15,
                    textTransform: 'none',
                  }}
                  onClick={() => dispatch(favArtwork(artwork._id))}
                >
                  Share
                </Button>
              </Grid>
            </Grid>
            <Grid item xs sx={{ textAlign: 'center', margin: 'auto' }}>
              <Paper className={classes.paper} elevation={0}>
                <img
                  onLoad={() => setIsImageLoading(true)}
                  src={`${artwork.image}?w=248&fit=crop&auto=format`}
                  srcSet={`${artwork.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt="Art work"
                  style={{ width: '100%', maxWidth: '500px' }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container direction="row" alignItems="center" spacing={2}>
                <Grid item xs={6} md={2}>
                  <img
                    src={`${artwork.artist.photo}?w=24&fit=crop&auto=format`}
                    style={{ maxWidth: '100%' }}
                    srcSet={`${artwork.artist.photo}?w=24&fit=crop&auto=format&dpr=1 x`}
                    alt="artist"
                  />
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                  xs={6}
                  md={10}
                  sx={{ position: 'relative' }}
                >
                  <Grid item xs>
                    <Typography variant="subtitle2">
                      {artwork.artist &&
                        `${artwork.artist.first_name} ${artwork.artist.last_name}`}
                    </Typography>
                    <Typography>
                      {artwork.artist &&
                        `${artwork.artist.origin}, ${artwork.artist.birthday}`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        backgroundColor: '#A2A28F',
                        color: 'black',
                        lineHeight: '0.4rem',
                        '&:hover': {
                          backgroundColor: 'black',
                        },
                        paddingLeft: 8,
                        paddingRight: 8,
                      }}
                      disabled={isDisabled}
                    >
                      Follow
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Divider
                className={classes.divider}
                style={{ marginTop: 20, marginBottom: 20 }}
              />
              <Grid item>
                <Typography color="#666666" variant="h5">
                  {artwork.title}
                </Typography>
                <Typography color="#666666" variant="body2">
                  {artwork.subtitle}
                </Typography>
                <Typography color="#666666" variant="body2">
                  {artwork.year}
                </Typography>
                <Typography color="#666666" variant="body2">
                  {artwork.medium}
                </Typography>
                <Typography color="#666666" variant="body2">
                  {artwork.unit === '0' && ' in '}
                  {artwork.unit === '1' && ' cm '}
                  {!artwork.unit && ' cm '}
                  <span
                    style={{
                      position: 'absolute',
                      direction: 'ltr',
                      paddingRight: 2,
                    }}
                  >
                    {artwork.width} x {artwork.height}
                  </span>
                </Typography>
                {artwork.edition_number > 0 && (
                  <Typography variant="body2">
                    {artwork.edition_number} from {artwork.edition_total}
                  </Typography>
                )}
                <Typography color="#666666" variant="body2">
                  {`${
                    !artwork.is_sold_out
                      ? artwork.edition_total - artwork.edition_number + 1
                      : 0
                  } Remaining`}
                </Typography>
              </Grid>
              <Divider
                className={classes.divider}
                style={{ marginTop: 20, marginBottom: 20 }}
              />
              <Grid item container>
                <Grid
                  item
                  md={8}
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Typography variant="h6">
                      {artwork.voucher.artwork_id
                        ? ` Ξ  ${priceEth}`
                        : `$ ${artwork.price.toLocaleString()}`}
                    </Typography>
                  </Grid>
                  <Grid item sx={{ mt: 3, width: '100%' }}>
                    <LoadingButton
                      loading={isLoading}
                      onClick={(e) => onAddToCart(e)}
                      variant={!successUserDetails ? 'outlined' : 'contained'}
                      type="submit"
                      fullWidth
                      disabled={isDisabled}
                    >
                      {successUserDetails
                        ? 'Purchase Artwork'
                        : 'Login To Purchase'}
                    </LoadingButton>
                  </Grid>
                </Grid>
                <Grid item md={2} />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="baseline"
          >
            <Hidden mdDown>
              <Grid item xs={1} sx={{ position: 'relative', marginLeft: 3 }}>
                <Typography variant="subtitle2" sx={{ marginTop: 5 }}>
                  {artwork && artwork.artist && `${artwork.artist.first_name}`}{' '}
                  <br />
                  {artwork &&
                    artwork.artist &&
                    `${artwork.artist.last_name}`}{' '}
                  <br />
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: '#A2A28F',
                      color: 'black',
                      marginTop: 1,
                      lineHeight: '0.4rem',
                      '&:hover': {
                        backgroundColor: 'black',
                      },
                    }}
                    disabled={isDisabled}
                  >
                    Follow
                  </Button>
                </Typography>
              </Grid>
            </Hidden>
            <Grid item xs={10} sx={{ marginLeft: 4 }}>
              <TheTab artist={artwork.artist} />
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              sx={{
                marginTop: 8,
              }}
            >
              <Grid item sm={1}>
                <Typography variant="subtitle1">Artists</Typography>
                <Typography variant="subtitle1">Artworks</Typography>
              </Grid>
              <Grid
                item
                xs={10}
                md={10}
                sx={{
                  marginLeft: 4,
                }}
              >
                {artwork && artwork.artist && (
                  <CarouselArtistArtworks artistId={artwork.artist._id} />
                )}
              </Grid>
            </Grid>
            <Grid sx={{ paddingLeft: 2, paddingRight: 2 }}>
              <RelatedCategory />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              sx={{
                marginTop: 8,
              }}
            >
              <Grid item sm={1}>
                <Typography variant="subtitle1">Similar</Typography>
                <Typography variant="subtitle1">Works</Typography>
              </Grid>
              <Grid
                item
                xs={10}
                md={10}
                sx={{
                  marginLeft: 4,
                }}
              >
                {artwork && artwork.artist && (
                  <CarouselArtistArtworks artistId={artwork.artist._id} />
                )}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              sx={{
                marginTop: 8,
              }}
            >
              <Grid item sm={1}>
                <Typography variant="subtitle1">Similar</Typography>
                <Typography variant="subtitle1">Works</Typography>
              </Grid>
              <Grid
                item
                xs={10}
                md={10}
                sx={{
                  marginLeft: 4,
                }}
              >
                {/* {artwork && artwork.artist && <CarouselArtist />} */}
              </Grid>
            </Grid>
          </Hidden>
        </>
      )}
    </Container>
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
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
