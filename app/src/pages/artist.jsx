/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Hidden from '@mui/material/Hidden';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import { Typography, Button, Container, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchCategories, fetchOneArtWork } from '../actions/artworkAction';
import TheTab from '../components/TheTab';
import CarouselRelatedArtistTwo from '../components/carousel/CarouselRelatedArtist-2';
import { ARTIST_BY_ID_RESET } from '../constants/artistConstants';
import { fetchArtistById, fetchSimilarArtists } from '../actions/artistAction';
import {
  favArtistChange,
  favArtworkChange,
  openAuthDialog,
} from '../actions/userAction';
import ArtistNotableArts from '../components/artists/ArtistNotableArts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // marginTop: 100,
    marginBottom: 100,
  },
  container: {
    display: 'grid',
  },
  paper: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '16px',
    marginLeft: theme.spacing(2),
  },
  categories: {
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

// match params has the id from the router /:workId
function Artist() {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const { artistId } = useParams();

  const [isFavoriteArtist, setIsFavoriteArtist] = useState(false);

  const theArtist = useSelector((state) => state.theArtist);
  const { artist, relatedArtists, error, loading, success } = theArtist;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, success: successCategories } = categoryList;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const favArtist = useSelector((state) => state.favArtist);
  const { success: successFavArtist } = favArtist;

  useEffect(() => {
    dispatch(fetchSimilarArtists(artistId));
    dispatch(fetchArtistById(artistId));
    if (!successCategories) {
      dispatch(fetchCategories());
    }
  }, [artistId]);

  // after fav
  useEffect(() => {
    if (successFavArtist) {
      dispatch(fetchArtistById(artistId));
    }
  }, [successFavArtist]);

  // check if is fav
  useEffect(() => {
    if (user && artist && artist.artist && artist.artist.favorites) {
      const isFavArtist = artist.artist.favorites.find(
        (userId) => userId === user.id
      );
      setIsFavoriteArtist(isFavArtist);
    }
  }, [artist]);

  // fetch artist if not success
  useEffect(() => {
    if (!success && artistId) {
      dispatch(fetchOneArtWork(artistId));
    }
    return () => {
      dispatch({ type: ARTIST_BY_ID_RESET });
    };
  }, [dispatch]);

  // fav artist
  const handleFavoriteArtist = (id) => {
    if (!user) {
      dispatch(openAuthDialog('login'));
    } else {
      dispatch(favArtistChange(id));
    }
  };

  const classes = useStyles();

  const renderElement = () => (
    <Container maxWidth="xl">
      {artist && (
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
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid
              item
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              sm={8}
              md={2}
              sx={{
                marginTop: '15px',
              }}
            >
              <Grid item>
                <img
                  style={{
                    height: '110px',
                    width: '70%',
                    marginBottom: '20px',
                  }}
                  src={artist.artist.photo}
                  alt="artist"
                />
              </Grid>
              <Grid
                item
                sx={{
                  width: '80%',
                }}
              >
                <Typography
                  style={{
                    color: '#000',
                    fontSize: '20px',
                    fontWeight: 600,
                  }}
                >
                  {artist &&
                    `${artist.artist.first_name} ${artist.artist.last_name}`}
                </Typography>
                <Typography
                  style={{
                    color: '#000',
                    fontSize: '17px',
                    fontWeight: 300,
                    lineHeight: 1.4,
                    margin: '8px 0px',
                  }}
                >
                  {artist.artist.origin.country.country}
                  {artist.artist.birthday.slice(0, 4)}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  width: '80%',
                }}
              >
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    width: '100%',
                    border: '1px solid #A2A28F',
                    color: '#A2A28F',
                    fontSize: '16px',
                    fontWeight: 500,
                    marginTop: '5px',
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                    padding: 0,
                  }}
                  onClick={() => handleFavoriteArtist(artist.artist._id)}
                >
                  {!isFavoriteArtist ? 'Follow' : 'UnFllow'}
                </Button>
              </Grid>
            </Grid>
            <Grid item xs md>
              <TheTab artist={artist.artist} />
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              sx={{
                marginTop: 8,
                padding: 0,
              }}
            >
              <Grid
                item
                md={12}
                sx={{
                  marginLeft: 0,
                }}
              >
                <ArtistNotableArts artist={artist} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box
                component="div"
                sx={{
                  p: 3,
                  width: '100%',
                  border: '1px solid #A2A28F',
                  overflowX: 'hidden',
                  marginTop: 5,
                  paddingLeft: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Grid item xs={2}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontSize: '1.2rem',
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
                      fontSize: '1.2rem',
                      fontWeight: 300,
                    }}
                  >
                    Categories
                  </Typography>
                </Grid>
                <Grid
                  sx={{
                    marginLeft: 0,
                  }}
                  xs={10}
                  item
                  display="flex"
                  justifyContent="space-between"
                >
                  {categories &&
                    categories.map((category, index) => (
                      <Button key={index} className={classes.categories}>
                        <Typography variant="body1">{category.name}</Typography>
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
                marginTop: 8,
              }}
            >
              {relatedArtists && (
                <CarouselRelatedArtistTwo relatedArtists={relatedArtists} />
              )}
            </Grid>
          </Hidden>
        </Grid>
      )}
    </Container>
  );

  return (
    <div className={classes.root}>
      <Grid container>
        {loading ? (
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

export default Artist;
