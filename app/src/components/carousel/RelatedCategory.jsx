import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 100,
  },
  paper: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '16px',
    marginLeft: theme.spacing(2),
  },
}));

function RelatedCategory({ categories }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        sx={{
          marginTop: 8,
          padding: 1,
          border: '1px solid #A2A28F',
          maxHeight: 60,
          opacity: '50%',
        }}
      >
        <Grid item xs={2}>
          <Typography variant="subtitle1">Related</Typography>
          <Typography variant="subtitle1">Categories</Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          item
          xs={10}
        >
          {categories.map((cat) => (
            <Grid key={cat._id} item xs>
              <Typography variant="subtitle1">{cat.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default RelatedCategory;

RelatedCategory.propTypes = {
  categories: PropTypes.array.isRequired,
};
