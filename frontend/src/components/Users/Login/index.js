import React, { useState } from 'react';

import { Container, Grid, Typography, TextField, Box, Link, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapperLogin: {
    marginTop: 32,
    border: '1px solid #c4c4c4',
    padding: 20,
    borderRadius: 5,
  },
}));
const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container fluid>
      <Grid container spacing={2} direction='row' justify='center' alignItems='center'>
        <Grid item xs={4}>
          <div className={classes.wrapperLogin}>
            <Typography variant='h4'>Login</Typography>
            <Typography variant='subtitle1'>Provide your details below</Typography>
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
                    <Button variant='contained' color='primary' fullWidth type='submit'>
                      Sign In
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Box textAlign='right'>
                      <Link href='#'>
                        <Typography variant='body2'>Don't know your password?</Typography>
                      </Link>
                      <Link href='#'>
                        <Typography variant='body2'>Create an account</Typography>
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

export default Login;
