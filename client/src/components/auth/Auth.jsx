import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Grid,
  Paper,
  Typography,
  Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { gapi } from 'gapi-script';

import Input from './Input';
import Icon from './Icon';

import useStyles from './styles';

const clientId =
  '858123658139-7e2n7tr1ninqcb1hlhobg1jcpb10audr.apps.googleusercontent.com';

const Auth = () => {
  // History
  const history = useHistory();

  // Styles
  const classes = useStyles();
  const dispatch = useDispatch();

  // State
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting...');
  };
  const handleChange = () => {};
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  // Switch Mode
  const switchMode = () => setIsSignUp((prev) => !prev);

  // Google Handlers
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    dispatch({
      type: 'AUTH',
      payload: { result, token }
    });

    history.push('/');

    try {
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign In was unsuccessful.  Try again later.');
  };

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name='first name'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='last name'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}

            <Input
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                handleChange={handleChange}
              />
            )}
          </Grid>
          <Button
            variant='contained'
            type='submit'
            fullWidth
            color='primary'
            className={classes.submit}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          {/* Secret: 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 */}
          <GoogleLogin
            clientId='858123658139-7e2n7tr1ninqcb1hlhobg1jcpb10audr.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color='primary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justifyContent='center'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already have an account?  Sign In.'
                  : "Don't have and account?  Sign Up."}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
