import styled from '@emotion/styled';
import { Box, Button, CardContent, CardMedia, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { FileCard } from '../components/FileCard';
import Grid from '@mui/material/Grid2';
import { CurrentFolder, File } from '../types/userFile.types';
import { useUploadFileMutation } from '../store/fileManagement';
import { Fragment } from 'react/jsx-runtime';
import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Loader } from './Loader';

const Card = styled(Stack)(({ theme }) => ({}));

export function Files(data: {
  files: File[] | undefined;
  currentFolder: CurrentFolder | undefined;
  isParentLoading: boolean;
}) {
  const [uploadFile, { isError, error, isLoading }]: any = useUploadFileMutation();

  const { files, currentFolder, isParentLoading } = data;

  const handleUploadFile = (event: any) => {
    event.preventDefault();
    const file = new FormData();
    file.append('file', event.currentTarget.files[0]);
    uploadFile({ file, folderId: currentFolder?.id });
  };

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
        <Fragment>
          <label htmlFor="file">
            <Button
              component="span"
              sx={{
                width: 225,
                height: 250,
                alignContent: 'flex-start',
                border: '2px dashed #1976d2',
                display: 'flex',
                p: 0
              }}>
              <input
                hidden
                id="file"
                name="file"
                multiple
                type="file"
                onChange={(e) => handleUploadFile(e)}
              />
              <Card>
                <CardMedia>
                  <AddCircleIcon fontSize="large" />
                </CardMedia>
                <CardContent>
                  <Typography variant="body1" component="div" noWrap>
                    {isError ? `${error?.data?.message}` : 'Add new file'}
                  </Typography>
                </CardContent>
              </Card>
            </Button>
          </label>
        </Fragment>
        {files?.map((file: File) => {
          return <FileCard file={file} key={file.id} currentFolder={currentFolder} />;
        })}
        {(isLoading || isParentLoading) && <Loader />}
      </Grid>
    </Box>
  );
}
