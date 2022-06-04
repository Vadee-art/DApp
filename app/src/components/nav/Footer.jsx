/* eslint-disable camelcase */
import React from 'react';
import {
  Grid,
  Button,
  Typography,
  IconButton,
  Box,
  TextField,
  Container,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FormControl from '@mui/material/FormControl';
import { useSelector } from 'react-redux';

const Root = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    backgroundColor: theme.palette.secondary.main,
    display: 'none',
  },
}));
const Root2 = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    backgroundColor: theme.palette.secondary.main,
    display: 'none',
  },
}));

const Footer = () => {
  const theMarketPlace = useSelector((state) => state.theMarketPlace);
  const { marketPlace } = theMarketPlace;

  return (
    <Box
      sx={{
        flexGrow: 1,
        clear: 'both',
        position: 'relative',
        backgroundColor: 'black',
        width: '100%',
        marginTop: '150px',
      }}
    >
      {marketPlace && marketPlace.contract && (
        <Root>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={1}
              sx={{
                paddingTop: 4,
                paddingBottom: 4,
                paddingRight: 8,
                paddingLeft: 8,
                textAlign: 'left',
              }}
            >
              <Grid xs={2} display="flex" alignItems="center">
                <img
                  src="/static/Primary-E.svg"
                  alt="Logo"
                  style={{
                    maxWidth: '35%',
                    aspectRatio: 1.7,
                  }}
                />
              </Grid>
              <Grid xs={2}>
                <Typography
                  sx={{
                    padding: 0,
                    fontSize: '0.9rem',
                    lineHeight: 1.4,
                  }}
                  variant="subtitle1"
                >
                  VADEE is a photography Gallery that runs a series of photos
                  and exhibitions based in Dubi, Tehran, and Amsterdam.
                  Subscribe to our newsletter to stay updated about our events.
                </Typography>
              </Grid>
              <Grid sx={{ paddingLeft: 10 }} xs={2}>
                <Grid>
                  <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>
                    About Us
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: '0.9rem', margin: '5px 0px' }}
                  >
                    Contract
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>
                    Help Center
                  </Typography>
                </Grid>
              </Grid>
              <Grid xs={2}>
                <Grid>
                  <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>
                    Terms &amp; Conditions
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: '0.9rem', margin: '5px 0px' }}
                  >
                    Copyright Policy
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: '0.9rem', margin: '5px 0px' }}
                  >
                    Privacy Policy
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>
                    Cookie Policy
                  </Typography>
                </Grid>
              </Grid>
              <Grid xs={1}>
                <Grid>
                  <IconButton
                    sx={{ padding: 0, marginBottom: 1.5, color: '#fff' }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Grid>
                <Grid>
                  <IconButton
                    sx={{ padding: 0, marginBottom: 1.5, color: '#fff' }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </Grid>
                <Grid>
                  <IconButton sx={{ padding: 0, color: '#fff' }}>
                    <FacebookIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                direction="column"
                justifyContent="center"
                alignItems="center"
                xs={3}
                sx={{ padding: 0 }}
              >
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      lineHeight: 1.4,
                    }}
                    variant="subtitle1"
                  >
                    VADEE is a photography Gallery that runs a series of photos
                    and exhibitions based in Dubi, Tehran, and Amsterdam.
                  </Typography>
                </Grid>
                <Grid item xs={2} sx={{ marginTop: 2 }}>
                  <FormControl fullWidth>
                    <form
                      style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                      }}
                    >
                      <Grid item xs={8}>
                        <TextField
                          placeholder="Enter your Email here"
                          sx={{
                            background: 'white',
                            outline: 'none',
                            border: 'none',
                          }}
                          size="small"
                          fullWidth
                          id="fullWidth"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          sx={{
                            color: 'white',
                            padding: '0.45rem',
                            fontWeight: 'bold',
                            backgroundColor: '#A2A28F',
                          }}
                          variant="contained"
                          type="submit"
                        >
                          Subscribe
                        </Button>
                      </Grid>
                    </form>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
              sx={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingBottom: 1.5,
                paddingTop: 1.5,
              }}
            >
              <Grid
                item
                md={2}
                xs={12}
                display="flex"
                alignItems="center"
                style={{ padding: 0 }}
              >
                <img
                  src="/static/VADEE Logotype - Footer.svg"
                  alt="Logo"
                  style={{ maxWidth: '50%' }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {`@ ${new Date().getFullYear()} VADEE `}
                  {' All Rights Reserved'}
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ margin: 0, padding: 0 }}
              >
                <Typography
                  sx={{ color: 'white', marginRight: 1, fontSize: '1.5rem' }}
                  variant="subtitle1"
                  component="span"
                >
                  $
                </Typography>
                <img
                  src="/static/usa.png"
                  alt="Logo"
                  style={{
                    aspectRatio: 1,
                    width: '40px',
                  }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                style={{ padding: 0, margin: 0 }}
              >
                <img
                  src="/static/visa.png"
                  alt="Logo"
                  style={{
                    height: '23px',
                  }}
                />
                <img
                  src="/static/mastercard.png"
                  alt="Logo"
                  style={{
                    height: '25px',
                    margin: '0px 15px',
                  }}
                />
                <img
                  src="/static/paypal.png"
                  alt="Logo"
                  style={{
                    height: '23px',
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Root>
      )}
      {/* FIXME:check what is this? */}
      {/* <Root2>
        <Grid
          sx={{
            padding: 1,
            backgroundColor: 'black',
            textAlign: 'center',
          }}
        >
          <img src="/static/logo.svg" alt="Logo" style={{ maxWidth: '30%' }} />
        </Grid>
      </Root2> */}
    </Box>
  );
};

export default Footer;
