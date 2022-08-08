import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Container } from '@mui/material';

function Media(props) {
  const { loading } = props;

  return (
    <Grid container wrap="nowrap">
      <Container
        maxWidth="100%"
        sx={{
          backgroundColor: '#d1d3c8',
          paddingBottom: '25px',
          margin: 0,
          marginTop: '20px',
          marginBottom: 100,
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            sx={{
              width: '100%',
              paddingLeft: 5,
              paddingRight: 6,
              paddingTop: '20px',
              marginBottom: 8,
            }}
          >
            <Grid item md={2} xs={12}>
              <Typography
                variant="h6"
                sx={{
                  color: '#818172',
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                Photographers
              </Typography>
            </Grid>
            <Grid
              item
              container
              md={10}
              xs={12}
              sx={{
                marginTop: 2,
              }}
            >
              {(loading && Array.from(new Array(3))).map((item, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  sx={{ m: 2 }}
                  width={300}
                  height={150}
                />
              ))}
            </Grid>
          </Grid>
        </Container>
      </Container>
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function MainSkeleton() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <>
        <Box sx={{ width: '100%', p: 5 }}>
          <Skeleton variant="rectangular" sx={{ width: '100%' }} height={700} />
        </Box>
        <Media loading />
      </>
    </Box>
  );
}
