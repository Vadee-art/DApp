import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
  ListItemText,
} from '@mui/material';
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
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from './AccountMenu';
import { fetchMarketPlace } from '../../actions/marketPlaceAction';
import { fetchUserDetails, logout } from '../../actions/userAction';

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

const SearchIconWrapper = styled('div')(() => ({
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

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      marginTop: '50px',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '20px',
    },
  },
  logo: {
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [current, setCurrent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [keyword, setKeyword] = useState('');

  const theMarketPlace = useSelector((state) => state.theMarketPlace);
  const { marketPlace, success } = theMarketPlace;

  useEffect(() => {
    if (!marketPlace && !success) {
      dispatch(fetchMarketPlace());
      dispatch(fetchUserDetails());
    }
  }, []);

  useEffect(() => {
    if (location.pathname.includes('artist')) {
      setCurrent(0);
    } else if (location.pathname.includes('artwork')) {
      setCurrent(1);
    } else if (location.pathname.includes('region')) {
      setCurrent(2);
    } else {
      setCurrent('');
    }
  }, [location]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // log out
  const handleLogOut = () => {
    dispatch(logout());
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Vadee
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/users/profile')}
            sx={{ textAlign: 'center' }}
          >
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleLogOut()}
            sx={{ textAlign: 'center' }}
          >
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const changeHandler = (event) => {
    // navigate(`/?keyword=${event.target.value}&page=1`);
    // const theKeyword = `?keyword=${event.target.value}`;
    // dispatch(fetchAllArtWorks(theKeyword));
    console.log(event.target.value);
  };

  const container =
    window !== undefined ? () => window.document.body : undefined;
  const drawerWidth = 240;
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.root}>
      {marketPlace && marketPlace.contract && (
        <Grid
          container
          sx={{
            width: '100%',
            paddingLeft: 2,
            paddingRight: 2,
            marginBottom: { xs: 0, ms: 4 },
          }}
        >
          <AppBar position="static" elevation={0}>
            <Toolbar style={{ padding: 0 }}>
              <Grid container direction="row">
                <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
                  <Link to="/">
                    <img
                      className={classes.logo}
                      src="/static/logo.svg"
                      alt="logo"
                    />
                    <Typography
                      sx={{ display: { xs: 'none', md: 'unset' } }}
                      variant="subtitle1"
                    >
                      Change you lense, change your story
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid item xs md={7}>
                  <Search onChange={(event) => changeHandler(event)}>
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
                  <>
                    <Grid item>
                      <IconButton
                        size="medium"
                        sx={{
                          border: '1px solid #A2A28F',
                          borderRadius: '10%',
                          height: '45px',
                          width: '45px',
                          display: { xs: 'none', md: 'unset' },
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
                          display: { xs: 'none', md: 'unset' },
                        }}
                      >
                        <MailOutlineIcon
                          fontSize="inherit"
                          style={{
                            color: '#A2A28F',
                          }}
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
                          display: { xs: 'none', md: 'unset' },
                        }}
                      >
                        <PersonOutlineIcon
                          fontSize="inherit"
                          style={{ color: '#A2A28F' }}
                        />
                      </IconButton>
                      {/* Menu to login and Register, ... */}
                      <AccountMenu
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                      />
                    </Grid>
                  </>
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
            <Grid
              item
              xs={12}
              container
              direction="row"
              alignItems="center"
              sx={{
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Grid item>
                <Link to="/artists/search">
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { sm: 15, md: 20 },
                      fontWeight: 300,
                      color: current === 0 ? '#99CCCC' : 'black',
                    }}
                  >
                    Photographers
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/artworks">
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { sm: 15, md: 20 },
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
                <Link to="/regions">
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { sm: 15, md: 20 },
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
          <Box component="nav">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
        </Grid>
      )}
    </Container>
  );
};

export default Header;
