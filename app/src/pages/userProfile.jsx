/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Tab, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import { useNavigate, useLocation } from 'react-router-dom';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useSelector } from 'react-redux';
import ProfileForm from '../components/profile/ProfileForm';
import ProfileFavoriteArtworks from '../components/profile/ProfileFavoriteArtworks';
import ProfileFavoriteArtists from '../components/profile/ProfileFavoriteArtists';
import ProfileOwned from '../components/profile/ProfileMyOwn';
import ProfileAdminTab from '../components/profile/ProfileAdminTab';
import ProfileMyOnSale from '../components/profile/ProfileMyOnSale';
import ProfileOrders from '../components/profile/ProfileOrders';

export default function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('redirect=')[1] : '';

  const [value, setValue] = useState('1');
  const userDetails = useSelector((state) => state.userDetails);
  const { user, error } = userDetails;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (error) {
      navigate(`/artworks${redirect}`);
    }
  }, [redirect, navigate]);
  return (
    <>
      <Grid
        container
        direction="row"
        sx={{
          textAlign: 'left',
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <Grid item xs={12} md={4}>
          <img src="/static/logo.svg" alt="logo" style={{ width: '60%' }} />
          <Typography variant="body1" color="primary">
            Change you lense, change your story
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="start"
        sx={{
          paddingLeft: 2,
          paddingRight: 2,
          marginTop: 5,
          minHeight: '80vh',
        }}
      >
        <Grid item xs={12}>
          <Box sx={{ typography: 'body1' }}>
            <TabContext value={value}>
              <Box
              // sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="My Profile" value="1" />
                  {/* <Tab
                    label="Own"
                    value="2"
                    onClick={() => dispatch({ type: SIGN_MY_ITEM_RESET })}
                  /> */}
                  {/* <Tab label="On Sale" value="3" /> */}
                  <Tab label="Orders" value="4" />
                  <Tab label="Fav Artworks" value="5" />
                  <Tab label="Fav Artist" value="6" />
                  {user && user.isAdmin && <Tab label="ADMIN" value="7" />}
                </TabList>
              </Box>

              <Box>
                <TabPanel value="1">
                  <ProfileForm />
                </TabPanel>
                <TabPanel value="2">
                  <ProfileOwned />
                </TabPanel>
                <TabPanel value="3">
                  <ProfileMyOnSale />
                </TabPanel>
                <TabPanel value="4">
                  <ProfileOrders />
                </TabPanel>
                <TabPanel value="5">
                  <ProfileFavoriteArtworks />
                </TabPanel>
                <TabPanel value="6">
                  <ProfileFavoriteArtists />
                </TabPanel>
                <TabPanel value="7">
                  <ProfileAdminTab />
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
