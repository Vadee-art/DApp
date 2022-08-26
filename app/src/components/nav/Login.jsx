import React, { useEffect } from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@mui/material/';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';
import Message from '../Message';
import { login } from '../../actions/userAction';
import { USER_DETAILS_RESET } from '../../constants/userConstants';

export default function LoginDialog({ setRegisterDialog, setLoginDialog }) {
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const userLogin = useSelector((state) => state.userLogin);
  const { error: errorLogin, loading: loadingLogin } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorUserDetails, success: successUserDetails } = userDetails;

  useEffect(() => {
    dispatch({ type: USER_DETAILS_RESET });
  }, []);

  useEffect(() => {
    if (successUserDetails) {
      setLoginDialog(false);
    }
  }, [successUserDetails]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(values.email, values.password));
  };

  // Don't have an account?
  const handleSwitchToRegister = () => {
    setLoginDialog(false);
    setRegisterDialog(true);
  };

  // value change
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // show password
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        maxWidth: 450,
        minHeight: 400,
      }}
    >
      <form onSubmit={handleLogin}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={10} sx={{ marginTop: 2, textAlign: 'center' }}>
            <img
              src="/static/logo.svg"
              alt="Logo"
              style={{ width: '60%', margin: 20 }}
            />
            <Typography variant="subtitle2">Login</Typography>
          </Grid>
          <Grid item xs={10} sx={{ margin: 2, width: '100%' }}>
            <TextField
              id="email-login"
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ borderRadius: '10px' }}
              required
            />
          </Grid>
          <Grid
            item
            xs={10}
            container
            direction="row"
            sx={{ margin: 1, width: '100%' }}
          >
            <Grid item xs={12}>
              <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 1, marginBottom: 1 }}>
              <Link to="#">
                <Typography variant="subtitle1" color="primary">
                  Forgot Password?
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 4 }}>
              <LoadingButton
                type="submit"
                loading={loadingLogin}
                variant="contained"
                color="secondary"
                sx={{ width: '100%', marginBottom: 2 }}
              >
                Login
              </LoadingButton>
              <Grid
                item
                xs={12}
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                  textAlign: 'center',
                }}
              >
                <Link to="#" onClick={handleSwitchToRegister}>
                  <Typography variant="subtitle1" color="primary">
                    Don't have an account?
                    <Typography
                      variant="subtitle1"
                      component="span"
                      color="secondary"
                    >
                      Sign up
                    </Typography>
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          {(errorUserDetails || errorLogin) && (
            <Grid sx={{ margin: 2 }}>
              <Message variant="outlined" severity="error">
                {errorUserDetails || errorLogin}
              </Message>
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
  );
}

LoginDialog.propTypes = {
  setLoginDialog: PropTypes.func.isRequired,
  setRegisterDialog: PropTypes.func.isRequired,
};
