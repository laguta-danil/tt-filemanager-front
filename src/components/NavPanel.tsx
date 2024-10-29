import React, { SetStateAction } from 'react';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const NavPanel = ({
  path,
  take,
  sortByFileName,
  sortByFolderName,
  setSortByNameFiles,
  setSortByNameFolders,
  setTake
}: {
  path: string;
  take: number;
  sortByFileName: 'asc' | 'desc';
  sortByFolderName: 'asc' | 'desc';
  setSortByNameFiles: React.Dispatch<SetStateAction<'asc' | 'desc'>>;
  setSortByNameFolders: React.Dispatch<SetStateAction<'asc' | 'desc'>>;
  setTake: React.Dispatch<SetStateAction<number>>;
}) => {
  const backPath = path.slice(0, path.lastIndexOf('/'));

  return (
    <Grid
      container
      p={1}
      sx={{
        backgroundColor: 'Scrollbar',
        borderRadius: 2,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid>
          <Button
            variant="contained"
            disabled={path === '/home' && true}
            sx={{
              color: '#1976d2',
              background: 'white',
              width: 75,
              height: 42,
              border: '1px solid #1976d2',
              ml: 1.5
            }}>
            <Link to={`${backPath}`} style={{ color: '#1976d2', alignSelf: 'start' }}>
              <KeyboardReturnIcon fontSize="medium" />
            </Link>
          </Button>
        </Grid>
        <Grid
          minWidth={220}
          width={'30%'}
          sx={{
            display: {
              xs: 'none',
              lg: 'block',
              md: 'block'
            }
          }}>
          <Typography color="black" variant="h6">
            {path}
          </Typography>
        </Grid>
      </Grid>
      <Grid>
        <Button
          variant="outlined"
          onClick={() => setSortByNameFiles(sortByFileName === 'asc' ? 'desc' : 'asc')}>
          {sortByFileName === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}sort by file name
        </Button>
        <Button
          variant="outlined"
          sx={{ ml: 1, mr: 1.5 }}
          onClick={() => setSortByNameFolders(sortByFolderName === 'asc' ? 'desc' : 'asc')}>
          {sortByFolderName === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}sort by folder name
        </Button>
      </Grid>
    </Grid>
  );
};
