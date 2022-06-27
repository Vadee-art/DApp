/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';
import {
  Grid,
  Box,
  Paper,
  Hidden,
  Container,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import { fetchAllArtWorks, fetchCategories } from '../actions/artworkAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SideFilter from '../components/SideFilter';
import { filterByRegion } from '../actions/filterAction';
import { fetchArtistList } from '../actions/artistAction';
import ArtistImageList from '../components/artists/ArtistImageList';
import ArtistCard from '../components/artists/ArtistCard';

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    paddingTop: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  responsive: {
    // margin: 40,
    // width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

const alphabets = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'U',
  'R',
  'S',
  'T',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
function ArtistList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [alph, setAlph] = useState('');
  const [page, setPage] = useState(1);

  const artworksList = useSelector((state) => state.artworks);
  const { error: errorArtworkList, loading, pages } = artworksList;

  const filterOrigin = useSelector((state) => state.filterOrigin);
  const { origins, success: successOrigins } = filterOrigin;

  const artistList = useSelector((state) => state.artistList);
  const {
    artists,
    error: errorArtworks,
    success: successArtistList,
  } = artistList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, success: successCategories } = categoryList;

  const favArtist = useSelector((state) => state.favArtist);
  const { success: successFavArtist } = favArtist;

  const { items } = usePagination({
    count: pages,
  });

  useEffect(() => {
    if (successFavArtist) {
      dispatch(fetchArtistList());
    }
  }, [successFavArtist]);

  // clean up
  // useEffect(() => {
  //   dispatch(cleanLocalCart());
  //   dispatch({ type: ARTWORK_DETAILS_RESET });
  //   return () => {
  //     dispatch(cleanLocalCart());
  //   };
  // }, [dispatch]);

  //  filter
  useEffect(() => {
    if (!successOrigins) {
      dispatch(filterByRegion());
    }
    if (!successArtistList) {
      dispatch(fetchArtistList());
    }
    if (!successCategories) {
      dispatch(fetchCategories());
    }
  }, []);

  // keyword
  useEffect(() => {
    let keyword = location.search;
    if (keyword && keyword.split('?regions=')[1]) {
      keyword = keyword.split('?regions=')[1].split('&')[0]; // example: ?regions=iran&page=1  ===> iran
    }
    if (keyword && keyword.split('?artist=')[1]) {
      keyword = keyword.split('?artist=')[1].split('&')[0]; // example: ?artist=اکبر&page=1  ===> اکبر
    }
    if (keyword && keyword.split('?category=')[1]) {
      keyword = keyword.split('?category=')[1].split('&')[0]; // example: ?artist=اکبر&page=1  ===> اکبر
    }

    if (!successArtistList) {
      dispatch(fetchAllArtWorks(keyword));
      dispatch(fetchArtistList(''));
    }
  }, [navigate]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleAlphabet = (e) => {
    setAlph(e.target.innerText); // needed for shadow after onClick
    if (alph === e.target.innerText) {
      dispatch(fetchArtistList());
      setAlph();
    }
    dispatch(fetchArtistList(`?alphabet=${e.target.innerText}`));
  };
  const classes = useStyles();

  return (
    <div style={{ minHeight: '100vh' }}>
      {loading ? (
        <Loader />
      ) : (
        successArtistList && (
          <Container maxWidth="xl">
            <Grid
              sx={{
                width: '100%',
                paddingLeft: 8,
                paddingRight: 8,
              }}
            >
              <Grid container direction="row" sx={{ paddingTop: 5 }}>
                <Grid item xs sx={{ marginTop: 0 }} />
                <Grid item xs={10}>
                  {alphabets &&
                    alphabets.map((alphabet, index) => (
                      <IconButton
                        value={alphabet}
                        key={index}
                        onClick={handleAlphabet}
                      >
                        <Typography
                          sx={{
                            borderRadius: 100,
                            boxShadow:
                              alph === alphabet
                                ? `inset 0 0 2px rgba(0, 0, 0, 0.3)`
                                : 0,
                            fontSize: '15px',
                            color: '#A2A28F',
                            p: '5px',
                            border: alph === alphabet ? '1px solid #99CCCC' : 0,
                          }}
                        >
                          {alphabet}
                        </Typography>
                      </IconButton>
                    ))}
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid item md={2} xs={12}>
                  <Divider style={{ margin: 'auto' }} variant="middle" />
                  {origins && origins.origins && (
                    <SideFilter
                      title="Region"
                      list={origins.origins}
                      kind="artists"
                    />
                  )}
                  <Divider style={{ margin: 'auto' }} variant="middle" />
                  {categories && categories[0] && (
                    <SideFilter
                      title="Genres"
                      list={categories}
                      kind="artists"
                    />
                  )}
                  <Divider style={{ margin: 'auto' }} variant="middle" />
                </Grid>
                <Grid item xs={10} className={classes.root}>
                  <Box
                    sx={{
                      overflowY: 'hidden',
                      padding: 10,
                      paddingTop: 0,
                    }}
                  >
                    <Divider style={{ marginBottom: 30 }} variant="middle" />
                    {artists.artists && (
                      <ArtistImageList artists={artists.artists} />
                    )}
                  </Box>
                  <Grid>
                    {pages > 1 && (
                      <nav
                        style={{
                          padding: 0,
                          margin: 0,
                          marginBottom: '35px',
                        }}
                      >
                        <List
                          style={{
                            width: '100%',
                            padding: 0,
                            alignItems: 'center',
                          }}
                        >
                          {items.map(
                            ({ p, type, selected, ...item }, index) => {
                              let children = null;

                              if (type === 'page') {
                                children = (
                                  <Button
                                    variant="text"
                                    color="primary"
                                    style={{
                                      fontWeight: selected ? 'bold' : undefined,
                                    }}
                                    sx={{
                                      fontSize: '20px',
                                      overflow: 'hidden',
                                      maxWidth: '20px',
                                      padding: '0 !important',
                                    }}
                                    {...item}
                                  >
                                    {index}
                                  </Button>
                                );
                              } else {
                                children = (
                                  <Button
                                    sx={{
                                      fontSize: '20px',
                                      fontWeight: 100,
                                      textTransform: 'none',
                                      paddingLeft: 0,
                                      paddingRight: 0,
                                      marginRight: type === 'previous' ? 10 : 0,
                                      marginLeft: type === 'previous' ? 0 : 10,
                                    }}
                                    // variant="text"
                                    {...item}
                                  >
                                    {type === 'previous' ? '< Prev' : 'Next >'}
                                  </Button>
                                );
                              }
                              return (
                                <li
                                  style={{
                                    maxWidth: type === 'page' ? '20px' : 'auto',
                                  }}
                                  key={index}
                                >
                                  {children}
                                </li>
                              );
                            }
                          )}
                        </List>
                      </nav>
                      // <Pagination
                      //   count={pages}
                      //   page={page}
                      //   onChange={handlePageChange}
                      //   variant="outlined"
                      //   color="secondary"
                      // />
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Hidden smUp>
                  <Grid container>
                    <Paper className={classes.responsive} elevation={0}>
                      {artists &&
                        artists[0] &&
                        artists.map((artist, index) => (
                          <Paper key={index} className={classes.paper}>
                            <ArtistCard key={index} artist={artist} />
                          </Paper>
                        ))}
                    </Paper>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
          </Container>
        )
      )}
      {errorArtworkList || errorArtworks ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Message
              variant="outlined"
              severity="error"
              sx={{ margin: 'auto' }}
            >
              {errorArtworkList || errorArtworks}
            </Message>
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
}

export default ArtistList;
