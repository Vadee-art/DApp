import React, { useState } from 'react';
import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../components/nav/Header';
import Footer from '../../components/nav/Footer';

const MainWrapper = experimentalStyled('div')(() => ({
  minHeight: '100vh',
  overflow: 'hidden',
  width: '100%',
}));
const PageWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',

  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.down('lg')]: {
    paddingTop: '64px',
  },
}));

const FullLayout = () => (
  <MainWrapper>
    <Header />
    <PageWrapper>
      <Container maxWidth={false}>
        <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
          <Outlet />
        </Box>
      </Container>
    </PageWrapper>
    <Footer />
  </MainWrapper>
);

export default FullLayout;
