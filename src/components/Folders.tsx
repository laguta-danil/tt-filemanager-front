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

const Card = styled(Stack)(({ theme }) => ({}));

export function Folders(data: { folders: Folder[] | undefined; currentFolder: CurrentFolder | undefined }) {
  const [createFolder, { isError, error }]: any = useCreateFolderMutation();
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        columns={{ xs: 2, sm: 8, md: 16 }}
        spacing={2}
        sx={{ backgroundColor: 'Scrollbar', p: 2, borderRadius: 4, width: '100%', minHeight: 600, maxHeight: 900, overflowY: 'scroll' }}>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            width: 225,
            height: 250,
            alignContent: 'flex-start',
            boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
            display: 'flex',
            p: 0
          }}>
          <Card>
            <CardMedia
              sx={{ height: 200, borderStartEndRadius: 4, borderTopLeftRadius: 4 }}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGmRN4uGF6GFsuUvEIQqtalPGbyFZBO1VlOw&s"
            />
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
          folderId={data?.currentFolder?.id}
        />
        {data?.folders?.map((folder: Folder) => {
          return <FolderCard folder={folder} key={folder.id} />;
        })}
      </Grid>
    </Box>
  );
}
