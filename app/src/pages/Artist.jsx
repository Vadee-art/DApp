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
import { fetchOneArtWork } from '../actions/artworkAction';
import TheTab from '../components/TheTab';
import CarouselRelatedArtist from '../components/carousel/CarouselRelatedArtist';
import { ARTIST_BY_ID_RESET } from '../constants/artistConstants';
import { fetchArtistById } from '../actions/artistAction';
import ArtSeriesCard from '../components/ArtSeriesCard';
import { favArtwork } from '../actions/userAction';

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
function Artist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { artistId } = useParams();

  const [isFav, setIsFav] = useState(false);

  const theArtist = useSelector((state) => state.theArtist);
  const { artist, relatedTags, relatedArtists, error, loading, success } =
    theArtist;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {
    if (!success) {
      dispatch(fetchArtistById(artistId));
    }
  }, [success, dispatch, artistId]);

  //   user favorite artist + reset artist works
  useEffect(() => {
    // dispatch({ type: ARTIST_BY_ID_RESET });
    // dispatch({ type: ARTIST_LIST_RESET });
    // if (user && success) {
    //   for (let i = 0; i < artist.favorites.length; i += 1) {
    //     if (artist.favorites[i] === user._id) {
    //       setIsFav(true);
    //     } else {
    //       setIsFav(true);
    //     }
    //   }
    // }
  }, [user, artist, success, dispatch]);

  // fetch artist if not success
  useEffect(() => {
    if (!success && artistId) {
      dispatch(fetchOneArtWork(artistId));
    }
    return () => {
      dispatch({ type: ARTIST_BY_ID_RESET });
    };
  }, [dispatch]);

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
              <Grid item>
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
                  {artist.artist.origin}
                  {artist.artist.birthday.slice(0, 4)}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    width: '100%',
                    border: '1px solid #A2A28F',
                    color: '#A2A28F',
                    fontSize: '18px',
                    fontWeight: 500,
                    marginTop: '5px',
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                  }}
                  onClick={() => dispatch(favArtwork(artist.artist._id))}
                >
                  Follow
                </Button>
              </Grid>
            </Grid>
            <Grid item xs sx={{ marginLeft: 0 }} md>
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
              <Grid item xs={2}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 300,
                    lineHeight: 1,
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
                <ImageList
                  cols={window.innerWidth < 800 ? 2 : 3}
                  gap={35}
                  sx={{
                    width: '100%',
                    marginTop: '0px !important',
                  }}
                >
                  {artist.artworks &&
                    artist.artworks
                      .slice(0, 6)
                      .map((artwork) => (
                        <ArtSeriesCard key={artwork._id} data={artwork} />
                      ))}
                </ImageList>
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
                    marginLeft: 0,
                  }}
                  xs={10}
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
              alignItems="flex-start"
              sx={{
                marginTop: 8,
              }}
            >
              <Grid item sm={2}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 300,
                    lineHeight: 1,
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
                  marginLeft: 0,
                }}
              >
                {relatedArtists && (
                  <CarouselRelatedArtist relatedArtists={relatedArtists} />
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
