import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DeleteForever, EditTwoTone } from '@mui/icons-material';
import { CurrentFolder, File } from '../types/userFile.types';
import { useRenameFileMutation } from '../store/fileManagement';
import { useState } from 'react';
import React from 'react';
import { InputNameModal } from './InputNameModal';

export function FileCard({ file, currentFolder }: { file: File | undefined; currentFolder: CurrentFolder | undefined }) {
  const [renameFile] = useRenameFileMutation();
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenModal = () => {
    setOpenEdit(true);
  };

  const handleCloseModal = () => {
    setOpenEdit(false);
  };

  return (
    <Grid sx={{ borderRadius: 4, width: 225, height: 250 }}>
      <Card sx={{ width: 225, height: 250 }}>
        <CardMedia sx={{ height: 140 }} image={file?.fileUrl} />
        <CardContent sx={{ height: 40, p: 1 }}>
          <Typography
            variant="body2"
            sx={{
              wordWrap: 'break-word',
              overflow: 'hidden',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
              display: '-webkit-box'
            }}>
            {file?.fileName}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'space-between',
            pb: 1
          }}>
          <Button>Share</Button>
          <Button onClick={handleOpenModal}>
            <EditTwoTone />
          </Button>
          <Button>
            <DeleteForever />
          </Button>
        </CardActions>
      </Card>
      <InputNameModal
        isOpen={openEdit}
        onClose={handleCloseModal}
        handleFunc={renameFile}
        inputType={'File'}
        currentFolderId={currentFolder?.id}
        fileId={file?.id}
      />
    </Grid>
  );
}
