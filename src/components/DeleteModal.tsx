import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleFunc: any;
  inputType?: string;
  folderId?: number | undefined;
  fileId?: number | undefined;
};

export const DeleteModal = (data: Props) => {
  const { isOpen, onClose, handleFunc, inputType, folderId, fileId } = data;

  const handleDelete = () => {
    handleFunc(fileId ? { fileId } : { folderId });
    onClose();
  };

  return (
    <Box>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Are you sure you want to delete {inputType}?</DialogTitle>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
