import React, { useState, useEffect } from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Message from '../Message';
import { login, openAuthDialog, register } from '../../actions/userAction';
import { DIALOG_RESET } from '../../constants/userConstants';

export default function LoginDialog() {
  const dispatch = useDispatch();

  const [logindialog, setLogindialog] = useState(false);
  const [registerdialog, setRegisterdialog] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const userRegister = useSelector((state) => state.userRegister);
  const { error: errorRegister } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { error: errorLogin, loading: loadingLogin } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { success: successUserDetails } = userDetails;

  const dialog = useSelector((state) => state.dialog);
  const {
    error: errorDialog,
    loading: loadingDialog,
    success: successDialog,
    status,
  } = dialog;

  // close dialogs if logged in
  useEffect(() => {
    if (status === 'register') {
      setRegisterdialog(true);
    }
    if (status === 'login') {
      setLogindialog(true);
    }
    if (successUserDetails) {
      setRegisterdialog(false);
      setLogindialog(false);
    }
  }, [status, successUserDetails]);

  // login
  const handleCloseLogin = () => {
    dispatch({ type: DIALOG_RESET });
    setLogindialog(false);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(values.email, values.password));
  };

  // register
  const handleCloseRegister = (e) => {
    e.preventDefault();
    dispatch({ type: DIALOG_RESET });
    setRegisterdialog(false);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(
      register(values.firstName, values.lastName, values.email, values.password)
    );
  };

  // Don't have an account?
  const handleSwitchToRegister = () => {
    dispatch(openAuthDialog('register'));
  };

  // Already have an account?
  const handleSwitchToLgin = () => {
    setRegisterdialog(false);
    dispatch(openAuthDialog('login'));
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

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <div>
        {/* Login dialog */}
        <Dialog open={logindialog} onClose={handleCloseLogin}>
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
                      loading={loadingDialog || loadingLogin}
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
                {errorLogin && (
                  <Grid sx={{ marginTop: 2 }}>
                    <Message variant="" severity="error">
                      {errorLogin}
                    </Message>
                  </Grid>
                )}
              </Grid>
            </form>
          </Box>
        </Dialog>
        {/* Register dialog */}
        <Dialog open={registerdialog} onClose={handleCloseRegister}>
          <Box
            sx={{
              maxWidth: 450,
              minHeight: 400,
            }}
          >
            <form onSubmit={handleRegister}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Grid
                  item
                  xs={10}
                  sx={{ marginTop: 2, marginBottom: 2, textAlign: 'center' }}
                >
                  <img
                    src="/static/logo.svg"
                    alt="Paella dish"
                    style={{ width: '60%', marginTop: 20 }}
                  />
                  <Typography variant="subtitle1" color="primary">
                    Change you lense, change your story
                  </Typography>
                </Grid>
                <Grid item xs={10} sx={{ margin: 1, width: '100%' }}>
                  <FormControl sx={{ width: '100%' }} variant="outlined">
                    <TextField
                      id="first-name"
                      type="text"
                      value={values.firstName}
                      onChange={handleChange('firstName')}
                      label="First name"
                      variant="outlined"
                      fullWidth
                      sx={{ borderRadius: '10px' }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={10} sx={{ margin: 1, width: '100%' }}>
                  <FormControl sx={{ width: '100%' }} variant="outlined">
                    <TextField
                      id="last-name"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange('lastName')}
                      label="Last name"
                      variant="outlined"
                      fullWidth
                      sx={{ borderRadius: '10px' }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={10} sx={{ margin: 1, width: '100%' }}>
                  <FormControl sx={{ width: '100%' }} variant="outlined">
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
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={10}
                  container
                  direction="row"
                  sx={{ margin: 1, width: '100%' }}
                >
                  <Grid item xs={12}>
                    <FormControl
                      sx={{ width: '100%' }}
                      variant="outlined"
                      required
                    >
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={handleCheck}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                      label={
                        <Typography component="span">
                          "I agree on the
                          <Typography component="span" color="secondary">
                            Terms of Use Privacy Policy Conditions
                          </Typography>
                          and to receiving emails from VADEE"
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 4 }}>
                    <LoadingButton
                      type="submit"
                      loading={loadingLogin}
                      variant="contained"
                      color="secondary"
                      sx={{ width: '100%', marginBottom: 2 }}
                    >
                      Register
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
                      <Link to="#" onClick={handleSwitchToLgin}>
                        <Typography variant="subtitle1" color="primary">
                          Already have an account?
                          <Typography
                            variant="subtitle1"
                            component="span"
                            color="secondary"
                          >
                            Sign in
                          </Typography>
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                {(errorRegister || errorLogin) && (
                  <Grid sx={{ marginTop: 2 }}>
                    <Message variant="" severity="error">
                      {errorRegister || errorLogin}
                    </Message>
                  </Grid>
                )}
              </Grid>
            </form>
          </Box>
        </Dialog>
      </div>
    </>
  );
}
