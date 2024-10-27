import styled from '@emotion/styled';
import { Box, Button, CssBaseline, Divider, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { GoogleIcon } from '../assets/singUpIcons';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import React from 'react';

const SignInContainer = styled(Stack)(({ theme }) => ({}));

export function Login(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    auth.signIn(email, password, () => {
      navigate(from, { replace: true });
    });
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const googleLogin = () => {
    auth.googleSingIn(() => {});
  };

  return (
    <Box
      sx={{
        backgroundColor: 'Scrollbar',
        p: 4,
        borderRadius: 4,
        maxWidth: 560,
        minWidth: 220,
        width: '25%'
      }}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: 'grey', pb: 2 }}>
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2
          }}>
          <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="email">Email</FormLabel>
            </Box>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? 'error' : 'primary'}
              sx={{ ariaLabel: 'email' }}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="password">Password</FormLabel>
            </Box>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
            Sign in
          </Button>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button fullWidth variant="outlined" onClick={googleLogin} startIcon={<GoogleIcon />}>
            Sign in with Google
          </Button>
        </Box>
      </SignInContainer>
    </Box>
  );
}
