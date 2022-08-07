/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-plusplus */
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';
import { Grid, Paper, Hidden } from '@mui/material';
import Loader from '../Loader';
import Message from '../Message';
import { fetchFavArtistList } from '../../actions/userAction';
import ArtistCard from '../artists/ArtistCard';
import FavArtistCard from '../artists/FavArtistCard';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    paddingTop: 0,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

function ProfileFavoriteArtists() {
  const dispatch = useDispatch();

  const favArtistList = useSelector((state) => state.favArtistList);
  const { error, loading, favArtists } = favArtistList;

  const favArtwork = useSelector((state) => state.favArtwork);
  const { artworkId } = favArtwork;

  useEffect(() => {
    dispatch(fetchFavArtistList());
  }, [dispatch, artworkId]);

  const classes = useStyles();
  return (
    <div style={{ minHeight: '100vh', maxWidth: '70%' }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="outlined" severity="error">
          {error}
        </Message>
      ) : (
        <>
          {favArtists && favArtists.favorites && (
            <>
              <Grid container direction="row" spacing={0}>
                <Grid item xs={9} className={classes.root}>
                  <ImageList
                    variant="masonry"
                    cols={3}
                    gap={30}
                    sx={{ paddingRight: 5 }}
                  >
                    {favArtists.favorites.map((artist) => (
                      <FavArtistCard key={artist._id} artist={artist} />
                    ))}
                  </ImageList>
                </Grid>
              </Grid>
              <Grid>
                <Hidden mdUp>
                  <Grid container>
                    <Paper className={classes.responsive} elevation={0}>
                      {favArtists.favorites.map((artist) => (
                        <Grid key={artist._id}>
                          <Paper className={classes.paper}>
                            <ArtistCard artist={artist} />
                          </Paper>
                        </Grid>
                      ))}
                    </Paper>
                  </Grid>
                </Hidden>
              </Grid>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ProfileFavoriteArtists;
