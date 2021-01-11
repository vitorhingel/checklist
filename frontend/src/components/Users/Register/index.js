import React, { useState } from 'react';

import { Container, Grid, Typography, TextField, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  wrapperRegister: {
    marginTop: 32,
    border: '1px solid #c4c4c4',
    padding: 20,
    borderRadius: 5,
  },
}));

const Register = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container fluid>
      <Grid container spacing={2} direction='row' justify='center' alignItems='center'>
        <Grid item xs={12} md={4}>
          <div className={classes.wrapperRegister}>
            <Typography variant='h4'>Register</Typography>
            <Typography variant='subtitle1'>Fulfill all details below</Typography>
            <Box marginTop={2} marginBottom={2}>
              <form onSubmit={onSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id='outlined-required'
                      label='Email'
                      placeholder='Email...'
                      variant='outlined'
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id='outlined-required'
                      label='Password'
                      variant='outlined'
                      placeholder='Password...'
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id='outlined-required'
                      label='Confirm Password'
                      variant='outlined'
                      placeholder='Confirm Password...'
                      type='password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant='contained' color='primary' fullWidth type='submit'>
                      Sign Up
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Box textAlign='right'>
                      <Link to='/'>
                        <Typography variant='body2'>Already have an account?</Typography>
                      </Link>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
