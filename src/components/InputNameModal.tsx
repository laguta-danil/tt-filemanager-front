import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { FormEvent } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleFunc: any;
  inputType: string;
  folderId?: number | undefined;
  currentFolderId?: number | undefined;
  fileId?: number | undefined;
};

export const InputNameModal = ({
  isOpen,
  onClose,
  handleFunc,
  inputType,
  folderId,
  currentFolderId,
  fileId
}: Props) => {
  const handler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const name = formJson.name;

    handleFunc(
      currentFolderId && fileId ? { name: name, currentFolderId, fileId } : { folderId: folderId, name: name }
    );
    onClose();
  };

  return (
    <Box>
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            handler(event);
          }
        }}>
        <DialogTitle>Name your {inputType}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Write name here"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
