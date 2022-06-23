import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserMenu from './UserMenu';
import { fetchMarketPlace } from '../../actions/marketPlaceAction';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(4),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  aspectRatio: 1,
  position: 'absolute',
  right: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  border: 'solid 1px #A2A28F',
  height: 45,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [current, setCurrent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [isHeader, setIsHeader] = useState(true);

  const [flag, setFlag] = useState(false);

  const theMarketPlace = useSelector((state) => state.theMarketPlace);
  const { marketPlace, success } = theMarketPlace;

  useEffect(() => {
    if (
      pathname === '/users/profile' ||
      pathname.includes('/cart/shippingAddress/')
    ) {
      setIsHeader(false);
    } else {
      setIsHeader(true);
    }
  }, [pathname, navigate]);

  useEffect(() => {
    if (!marketPlace && !success) {
      dispatch(fetchMarketPlace());
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: 10, marginBottom: 5 }}>
      {isHeader && marketPlace && marketPlace.contract && (
        <Grid
          container
          sx={{
            width: '100%',
            paddingLeft: 8,
            paddingRight: 8,
            marginBottom: 8,
          }}
        >
          <AppBar position="static" elevation={0}>
            <Toolbar style={{ padding: 0 }}>
              <Grid container direction="row">
                <Grid item xs={12} md={3}>
                  <Link
                    to="/"
                    style={{ color: current === 0 ? '#99CCCC' : 'black' }}
                  >
                    <img
                      src="/static/logo.svg"
                      alt="logo"
                      style={{
                        width: '100%',
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '1.2rem',
                        margin: '15px 0px',
                        fontWeight: 300,
                      }}
                      variant="subtitle1"
                    >
                      Change you lense, change your story
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={8} md={7}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon
                        color="primary"
                        size="large"
                        style={{
                          height: '30px',
                          width: '30px',
                        }}
                      />
                    </SearchIconWrapper>
                    <StyledInputBase inputProps={{ 'aria-label': 'search' }} />
                  </Search>
                </Grid>
                <Grid
                  md={2}
                  item
                  xs={12}
                  container
                  direction="row"
                  justifyContent="flex-end"
                >
                  {!flag ? (
                    <>
                      <Grid item>
                        <IconButton
                          size="medium"
                          sx={{
                            border: '1px solid #A2A28F',
                            borderRadius: '10%',
                            height: '45px',
                            width: '45px',
                          }}
                        >
                          <NotificationsNoneIcon
                            fontSize="inherit"
                            style={{ color: '#A2A28F' }}
                          />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          size="medium"
                          sx={{
                            border: '1px solid #A2A28F',
                            borderRadius: '10%',
                            height: '45px',
                            width: '45px',
                            margin: '0px 10px',
                          }}
                        >
                          <MailOutlineIcon
                            fontSize="inherit"
                            style={{ color: '#A2A28F' }}
                          />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={handleClick}
                          size="medium"
                          sx={{
                            border: '1px solid #A2A28F',
                            borderRadius: '10%',
                            height: '45px',
                            width: '45px',
                          }}
                        >
                          <PersonOutlineIcon
                            fontSize="inherit"
                            style={{ color: '#A2A28F' }}
                          />
                        </IconButton>
                        {/* Menu to login and Register, ... */}
                        <UserMenu
                          anchorEl={anchorEl}
                          setAnchorEl={setAnchorEl}
                        />
                      </Grid>
                    </>
                  ) : (
                    <Grid
                      container
                      direction="row"
                      width="100%"
                      justifyContent="flex-end"
                      style={{ paddingLeft: 10 }}
                    >
                      <Button
                        style={{
                          width: '33%',
                          backgroundColor: '#26262648',
                          color: '#fff',
                          height: '45px',
                          borderRadius: 0,
                          outline: 'none',
                          fontSize: '0.8rem',
                          fontWeight: 300,
                        }}
                        onClick={() => setFlag(false)}
                      >
                        Log In
                      </Button>
                      <Button
                        onClick={() => setFlag(false)}
                        style={{
                          width: '33%',
                          backgroundColor: '#A2A28F',
                          color: '#fff',
                          height: '45px',
                          borderRadius: 0,
                          outline: 'none',
                          fontSize: '0.8rem',
                          fontWeight: 300,
                          marginLeft: '10px',
                        }}
                      >
                        Sign Up
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            style={{
              padding: 0,
              paddingTop: '15px',
              paddingBottom: '10px',
            }}
          >
            <Grid item xs={12} container direction="row" alignItems="center">
              <Grid item>
                <Link to="/artists" onClick={() => setCurrent(0)}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '19px',
                      fontWeight: 300,
                      color: current === 0 ? '#99CCCC' : 'black',
                    }}
                  >
                    Photographers
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/artworks" onClick={() => setCurrent(1)}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '19px',
                      fontWeight: 300,
                      margin: '0px 20px',
                      color: current === 1 ? '#99CCCC' : 'black',
                    }}
                  >
                    Artworks
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/regions" onClick={() => setCurrent(2)}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '19px',
                      fontWeight: 300,
                      color: current === 2 ? '#99CCCC' : 'black',
                    }}
                  >
                    Regions
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Header;
