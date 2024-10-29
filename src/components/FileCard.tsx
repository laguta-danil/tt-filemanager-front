import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DeleteForever, EditTwoTone } from '@mui/icons-material';
import { CurrentFolder, File } from '../types/userFile.types';
import { useDeleteFileMutation, useRenameFileMutation } from '../store/fileManagement';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import React from 'react';
import { InputNameModal } from './InputNameModal';
import DownloadIcon from '@mui/icons-material/Download';
import { DeleteModal } from './DeleteModal';
import { Link } from 'react-router-dom';

export function FileCard({
  file,
  currentFolder
}: {
  file: File | undefined;
  currentFolder: CurrentFolder | undefined;
}) {
  const [renameFile] = useRenameFileMutation();
  const [deleteFile] = useDeleteFileMutation();
  const [openDeleteModal, setOpenDeleteModel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [image, setImage] = useState(file?.fileUrl);

  const handleOpenModal = () => {
    setOpenEdit(true);
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModel(true);
  };

  const handleCloseModal = () => {
    setOpenEdit(false);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModel(false);
  };

  useEffect(() => {
    //TODO on back-end store prew images to regular mime types
    if (file?.fileName.includes('.pdf')) {
      setImage(
        'data:image/png;base64,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'
      );
    }
    if (file?.fileName.includes('.mp4')) {
      setImage('https://seekvectors.com/files/download/76b52134927ca00ef11947cf43fb8a78.jpg');
    }
  });

  const isImage = (file: File | undefined) => {
    if (file?.fileName.includes('jpg') || file?.fileName.includes('png')) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Grid sx={{ borderRadius: 4, width: 225, height: 250 }}>
      <Card sx={{ width: 225, height: 250 }}>
        <Link to={`${file?.fileUrl}`}>
          <CardMedia
            sx={{
              height: 140,
              backgroundPosition: 'unset',
              backgroundSize: !isImage(file) ? 'contain' : 'cover',
              backgroundPositionX: 'center'
            }}
            image={image}
          />
        </Link>
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
          <Button>
            <ShareIcon />
            Share
          </Button>
          <Box sx={{ display: 'flex' }}>
            <Button sx={{ minWidth: 'unset' }}>
              <DownloadIcon />
            </Button>
            <Button onClick={handleOpenModal} sx={{ minWidth: 'unset' }}>
              <EditTwoTone />
            </Button>
            <Button onClick={handleOpenDeleteModal} sx={{ minWidth: 'unset' }}>
              <DeleteForever sx={{ color: '#B9313F' }} />
            </Button>
          </Box>
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
      <DeleteModal
        isOpen={openDeleteModal}
        onClose={handleCloseDeleteModal}
        handleFunc={deleteFile}
        inputType={file?.fileName}
        fileId={file?.id}
      />
    </Grid>
  );
}
