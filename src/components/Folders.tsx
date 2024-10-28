import styled from '@emotion/styled';
import { Box, Button, CardContent, CardMedia, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useCreateFolderMutation } from '../store/fileManagement';
import Grid from '@mui/material/Grid2';
import { CurrentFolder, Folder } from '../types/userFile.types';
import { FolderCard } from './FolderCard';
import { useState } from 'react';
import React from 'react';
import { InputNameModal } from './InputNameModal';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Loader } from './Loader';

const Card = styled(Stack)(({ theme }) => ({}));

export function Folders(data: {
  folders: Folder[] | undefined;
  currentFolder: CurrentFolder | undefined;
  isParentLoading: boolean;
}) {
  const [createFolder, { isError, error, isLoading }]: any = useCreateFolderMutation();
  const [open, setOpen] = useState(false);

  const { folders, currentFolder, isParentLoading } = data;

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        columns={{ xs: 2, sm: 8, md: 16 }}
        spacing={2}
        sx={{
          backgroundColor: 'Scrollbar',
          p: 2,
          borderRadius: 4,
          width: '100%',
          minHeight: 600,
          maxHeight: 900,
          overflowY: 'scroll'
        }}>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            width: 225,
            height: 250,
            alignContent: 'flex-start',
            border: '2px dashed #1976d2',
            display: 'flex',
            p: 0
          }}>
          <Card>
            <CardMedia>
              <CreateNewFolderIcon fontSize="large" />
            </CardMedia>
            <CardContent>
              <Typography variant="body1" component="div" noWrap>
                {isError ? `${error.data.message}` : 'Add new folder'}
              </Typography>
            </CardContent>
          </Card>
        </Button>
        <InputNameModal
          isOpen={open}
          onClose={() => setOpen(false)}
          handleFunc={createFolder}
          inputType={'Folder'}
          folderId={currentFolder?.id}
        />
        {folders?.map((folder: Folder) => {
          return <FolderCard folder={folder} key={folder.id} />;
        })}
        {(isLoading || isParentLoading) && <Loader />}
      </Grid>
    </Box>
  );
}
