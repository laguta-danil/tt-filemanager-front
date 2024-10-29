import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DeleteForever, EditTwoTone } from '@mui/icons-material';
import { Folder } from '../types/userFile.types';
import React, { useState } from 'react';
import { useDeleteFolderMutation, useRenameFolderMutation } from '../store/fileManagement';
import { InputNameModal } from './InputNameModal';
import DownloadIcon from '@mui/icons-material/Download';
import FolderIcon from '@mui/icons-material/Folder';
import ShareIcon from '@mui/icons-material/Share';
import { DeleteModal } from './DeleteModal';
import { Link, useLocation } from 'react-router-dom';

export function FolderCard({ folder }: { folder: Folder | undefined }) {
  const [renameFolder] = useRenameFolderMutation();
  const [deleteFolder] = useDeleteFolderMutation();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const location = useLocation();

  const nextFolder = `${location.pathname}/${folder?.folderInsideId}`;

  const handleOpenModal = () => {
    setOpenEdit(true);
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
    setOpenEdit(false);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <Grid sx={{ borderRadius: 4, width: 225, height: 250 }}>
      <Card sx={{ width: 225, height: 250 }}>
        <CardMedia sx={{ height: 140 }}>
          <Link to={nextFolder}>
            <FolderIcon sx={{ fontSize: 150, color: '#7BB1E5' }} />
          </Link>
        </CardMedia>
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
            {folder?.folderName}
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
        handleFunc={renameFolder}
        inputType={'Folder'}
        folderId={folder?.folderInsideId}
      />
      <DeleteModal
        isOpen={openDeleteModal}
        onClose={handleCloseDeleteModal}
        handleFunc={deleteFolder}
        inputType={'Folder'}
        folderId={folder?.folderInsideId}
      />
    </Grid>
  );
}
