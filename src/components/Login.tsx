import styled from '@emotion/styled';
import { Box, Button, CssBaseline, Divider, Typography } from '@mui/material';
import { GoogleIcon } from '../assets/singUpIcons';
import Stack from '@mui/material/Stack';
import { useAuth } from '../services/auth';
import React from 'react';

const SignInContainer = styled(Stack)(({ theme }) => ({}));

export function Login(props: { disableCustomTheme?: boolean }) {
  const auth = useAuth();

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
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: 'grey', pb: 2 }}>
          Sign in
        </Typography>
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
