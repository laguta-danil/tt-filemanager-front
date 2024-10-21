import { Button, Input } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAuth } from '../services/auth';
import { Link } from 'react-router-dom';

export const Header = () => {
  const auth = useAuth();

  const logOutHandler = () => {
    auth.signOut(() => {});
  };

  return (
    <Grid
      container
      spacing={1}
      p={0.5}
      sx={{ height: 50, backgroundColor: 'Scrollbar', borderRadius: 2, width: '100%', justifyContent: 'space-between' }}>
      <Grid container>
        <Button variant="contained" sx={{ color: 'black', background: '#969696', width: 150, ml: 0.5 }}>
          <Link to={'/'}> My files</Link>
        </Button>
        <Button variant="contained" sx={{ color: 'black', background: '#969696', width: 150 }}>
          Shared to me
        </Button>
      </Grid>
      <Grid minWidth={220} width={'30%'} sx={{ display: { xs: 'none', lg: 'block', md: 'block' } }}>
        <Input placeholder="search" sx={{ borderRadius: 2, width: '100%', height: 42 }} />
      </Grid>
      <Button variant="contained" sx={{ color: 'black', background: '#969696', width: 150, mr: 0.5 }} onClick={logOutHandler}>
        LogOut
      </Button>
    </Grid>
  );
};
