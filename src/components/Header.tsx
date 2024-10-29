import { Button, Input, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAuth } from '../services/auth';
import { Link } from 'react-router-dom';
import React, { SetStateAction } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export const Header = ({
  searchValue,
  setSearch
}: {
  searchValue: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
}) => {
  const auth = useAuth();

  const logOutHandler = () => {
    auth.signOut(() => {});
  };

  return (
    <Grid
      container
      spacing={1}
      p={2}
      sx={{
        backgroundColor: 'Scrollbar',
        borderRadius: 2,
        width: '100%',
        justifyContent: 'space-between'
      }}>
      <Grid container>
        <Button
          variant="contained"
          sx={{ color: '#1976d2', background: 'white', width: 150, border: '1px solid #1976d2', ml: 0.5 }}>
          <Link to={'/home'} style={{ color: '#1976d2' }}>
            Main Folder
          </Link>
        </Button>
        <Button
          variant="contained"
          disabled
          sx={{ color: '#1976d2', background: 'white', width: 150, border: '1px solid #1976d2' }}>
          Shared to me
        </Button>
      </Grid>
      <Grid minWidth={220} width={'30%'} sx={{ display: { xs: 'none', lg: 'block', md: 'block' } }}>
        <Input
          placeholder="search"
          value={searchValue}
          onChange={(e) => setSearch(e.currentTarget.value)}
          sx={{ borderRadius: 2, width: '100%', height: 42 }}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Grid>
      <Button
        variant="contained"
        sx={{ color: 'white', background: '#1976d2', width: 150, mr: 0.5 }}
        onClick={logOutHandler}>
        LogOut
      </Button>
    </Grid>
  );
};
