import styled from '@emotion/styled';
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { useCreateFolderMutation } from '../store/fileManagement';
import Grid from '@mui/material/Grid2';
import { CurrentFolder, File, Folder } from '../types/userFile.types';
import { FolderCard } from './FolderCard';
import { FormEvent, useState } from 'react';

const Card = styled(Stack)(({ theme }) => ({}));

export function Folders(data: { folders: Folder[] | undefined; currentFolder: CurrentFolder | undefined }) {
  const [createFolder, { isError, error }]: any = useCreateFolderMutation();
  const [open, setOpen] = useState(false);

  const handleOpenFolderNameField = () => {
    setOpen(true);
  };

  const handleOCloseFolderNameField = () => {
    setOpen(false);
  };

  const handleUploadFile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const name = formJson.name;
    console.log(name);
    createFolder({ folderId: data?.currentFolder?.id, folderName: name });
    setOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        columns={{ xs: 2, sm: 8, md: 16 }}
        spacing={2}
        sx={{ backgroundColor: 'Scrollbar', p: 2, borderRadius: 4, width: '100%', minHeight: 600, maxHeight: 900, overflowY: 'scroll' }}>
        <Button
          onClick={handleOpenFolderNameField}
          sx={{
            width: 225,
            height: 250,
            alignContent: 'flex-start',
            boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
            display: 'flex',
            p: 0
          }}>
          <Dialog
            open={open}
            onClose={handleOCloseFolderNameField}
            PaperProps={{
              component: 'form',
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                handleUploadFile(event);
              }
            }}>
            <DialogTitle>Name your folder</DialogTitle>
            <DialogContent>
              <TextField autoFocus required margin="dense" id="name" name="name" label="Write name here" fullWidth variant="standard" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOCloseFolderNameField}>Cancel</Button>
              <Button type="submit">Subscribe</Button>
            </DialogActions>
          </Dialog>
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
        {data?.folders?.map((folder: Folder) => {
          return <FolderCard folder={folder} />;
        })}
      </Grid>
    </Box>
  );
}
