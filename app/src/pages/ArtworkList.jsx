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
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import ArtCard from '../components/ArtCard';
import { fetchAllArtWorks, fetchCategories } from '../actions/artworkAction';
import { cleanLocalCart } from '../actions/cartAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  ARTWORK_DETAILS_RESET,
  ARTWORK_LIST_RESET,
} from '../constants/artworkConstants';
import SideFilter from '../components/SideFilter';
import { fetchArticlesList } from '../actions/articleAction';
import { filterByRegion } from '../actions/filterAction';
import { fetchArtistList } from '../actions/artistAction';

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

function ArtworksList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState(false);
  const [keywordValue, setKeywordValue] = useState();

  const favArtwork = useSelector((state) => state.favArtwork);
  const { artworkId } = favArtwork;

  const artworksList = useSelector((state) => state.artworks);
  const { error, loading, artworks, pages } = artworksList;

  const articlesList = useSelector((state) => state.articlesList);
  const { articles, success: successArticles } = articlesList;

  const filterOrigin = useSelector((state) => state.filterOrigin);
  const { origins, success: successOrigins } = filterOrigin;

  const artistList = useSelector((state) => state.artistList);
  const { artists, success: successArtistList } = artistList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, success: successCategories } = categoryList;

  const { items } = usePagination({
    count: pages,
  });

  const prices = [
    { name: 'Under $500' },
    { name: 'Under $1000' },
    { name: 'Under $2000' },
    { name: 'Under $5000' },
    { name: 'Under $10000' },
    { name: 'Under $15000' },
    { name: 'Under $20000' },
  ];
  const genres = [
    { name: 'genres 1' },
    { name: 'genres 2' },
    { name: 'genres 3' },
    { name: 'genres 4' },
  ];
  const size = [
    { name: 'size 1' },
    { name: 'size 2' },
    { name: 'size 3' },
    { name: 'size 4' },
  ];
  const decade = [
    { name: 'decade 1' },
    { name: 'decade 2' },
    { name: 'decade 3' },
    { name: 'decade 4' },
  ];
  const data = useSelector((state) => state);

  let keyword = history.location.search;
  useEffect(() => {
    dispatch(fetchAllArtWorks(keyword || keywordValue));
    if (!successArticles) {
      dispatch(fetchArticlesList());
    }
    return () => {
      dispatch({ type: ARTWORK_LIST_RESET });
    };
  }, [dispatch, keyword, artworkId, successArticles, keywordValue]);

  // clean up
  useEffect(() => {
    dispatch(cleanLocalCart());
    dispatch({ type: ARTWORK_DETAILS_RESET });
    return () => {
      dispatch(cleanLocalCart());
    };
  }, [dispatch]);

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
  }, [successOrigins, successArtistList, successCategories, dispatch, history]);

  useEffect(() => {}, [successArtistList, dispatch]);

  // pagination
  const handlePageChange = (event, value) => {
    setPage(value);
    if (keyword) {
      keyword = keyword.split('?keyword=')[1].split('&')[0]; // example: ?keyword=اکبر&page=1  ===> اکبر
    }
    history.push(`/artworks/?keyword=${keyword}&page=${value}`);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(event);
    if (event.target.checked) {
      setKeywordValue('?onMarket=Ture');
    } else {
      setKeywordValue();
    }
  };

  const classes = useStyles();

  console.log('log data', origins);
  return (
    <div style={{ minHeight: '100vh' }}>
      {!artworks[0] ? (
        <Loader />
      ) : (
        <Container maxWidth="xl">
          {successArticles && articles[0] && (
            <Grid
              sx={{
                width: '100%',
                paddingLeft: 8,
                paddingRight: 8,
              }}
            >
              <Paper
                className={classes.paper}
                elevation={0}
                style={{ margin: 0, padding: 0 }}
              >
                <Grid
                  container
                  direction="row"
                  sx={{
                    width: '100%',
                  }}
                >
                  <Grid
                    item
                    xs
                    // sm={2}
                    sx={{
                      marginTop: 0,
                      marginRight: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        lineHeight: 1.5,
                        fontSize: '1rem',
                      }}
                    >
                      {articles[0].title}
                    </Typography>
                  </Grid>
                  <Grid
                    xs={10}
                    // sm={10}
                    // md={6}
                    item
                  >
                    <Typography
                      style={{
                        fontSize: '1.1rem',
                        lineHeight: 1.4,
                        fontWeight: 'lighter',
                      }}
                    >
                      {articles[0].content}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}

          <Grid
            container
            direction="row"
            sx={{
              width: '100%',
              paddingLeft: 8,
              paddingRight: 8,
              marginTop: 10,
            }}
          >
            <Grid item xs sx={{ marginTop: 0, marginRight: 4 }}>
              {/* FIXME:on market */}
              {/* <Divider style={{ margin: 'auto' }} variant="middle" /> */}
              {/* <FormControlLabel
                // label="On Market"
                label="none"
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
              /> */}
              {artists && artists[0] && (
                <SideFilter title="Artist" list={artists} kind="artworks" />
              )}
              <Divider style={{ margin: 'auto' }} variant="middle" />
              {genres && genres[0] && (
                <SideFilter title="Genres" list={genres} kind="artworks" />
              )}
              <Divider style={{ margin: 'auto' }} variant="middle" />
              {categories && categories[0] && (
                <SideFilter title="Themes" list={categories} kind="artworks" />
              )}
              <Divider style={{ margin: 'auto' }} variant="middle" />
              {origins && origins.origins && (
                <SideFilter
                  title="Region"
                  list={origins.origins}
                  kind="artworks"
                />
              )}
              <Divider style={{ margin: 'auto' }} variant="middle" />
              {size && size[0] && (
                <SideFilter title="Size" list={size} kind="artworks" />
              )}
              <Divider style={{ margin: 'auto' }} variant="middle" />
              {prices && prices[0] && (
                <SideFilter title="Price" list={prices} kind="artworks" />
              )}
              <Divider style={{ margin: 'auto' }} variant="middle" />
              {decade && decade[0] && (
                <SideFilter title="Decade" list={decade} kind="artworks" />
              )}
            </Grid>
            <Grid
              item
              xs={10}
              className={classes.root}
              style={{
                margin: 0,
                padding: 0,
              }}
            >
              <Box
                sx={{
                  overflowY: 'hidden',
                  padding: 0,
                  paddingTop: 0,
                }}
              >
                {/* <Divider style={{ marginBottom: 30 }} variant="middle" /> */}
                <ImageList
                  justifyContent="space-between"
                  // variant="woven"
                  cols={window.innerWidth < 800 ? 2 : 3}
                  gap={35}
                  sx={{
                    width: '100%',
                    marginTop: '0px !important',
                  }}
                >
                  {artworks && checked
                    ? artworks.map(
                        (artwork) =>
                          artwork.edition_number <= artwork.edition_total &&
                          artwork.on_market && (
                            <ArtCard key={artwork._id} data={artwork} />
                          )
                      )
                    : artworks.map((artwork) => (
                        <ArtCard key={artwork._id} data={artwork} />
                      ))}
                </ImageList>
              </Box>
              <Grid>
                {pages > 1 && (
                  // FIXME:change to MUI Pagination
                  // <Pagination
                  //   count={pages}
                  //   page={page}
                  //   onChange={handlePageChange}
                  //   variant="text"
                  //   color="secondary"
                  // />
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
                      {items.map(({ p, type, selected, ...item }, index) => {
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
                                fontWeight: 500,
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
                      })}
                    </List>
                  </nav>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Hidden smUp>
              <Grid container>
                <Paper className={classes.responsive} elevation={0}>
                  {artworks &&
                    artworks.map((artwork) => (
                      <Grid key={artwork._id}>
                        {artwork.on_market && checked && (
                          <Paper className={classes.paper}>
                            <ArtCard data={artwork} />
                          </Paper>
                        )}
                      </Grid>
                    ))}
                </Paper>
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      )}
      {error ? (
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
              {error}
            </Message>
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
}

export default ArtworksList;
