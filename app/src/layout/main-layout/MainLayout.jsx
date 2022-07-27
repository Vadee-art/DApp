import React from 'react';
import { experimentalStyled, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../../components/nav/Header';
import Footer from '../../components/nav/Footer';

const MainWrapper = experimentalStyled('div')(() => ({
  minHeight: '100vh',
  overflow: 'hidden',
  width: '100%',
}));

const MainLayout = () => (
  <MainWrapper>
    <Header />
    <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
      <Outlet />
    </Box>
    <Footer />
  </MainWrapper>
);

export default MainLayout;
