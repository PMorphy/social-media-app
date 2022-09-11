import React from 'react';
import {
  Avatar,
  Button,
  Grid,
  Paper,
  Typography,
  Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
const Auth = () => {
  const isSignUp = true;
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting...');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}></form>
      </Paper>
    </Container>
  );
};

export default Auth;