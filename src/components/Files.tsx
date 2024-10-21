import styled from '@emotion/styled';
import { Box, Button, CardContent, CardMedia, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { FileCard } from '../components/FileCard';
import Grid from '@mui/material/Grid2';
import { CurrentFolder, File } from '../types/userFile.types';
import { useUploadFileMutation } from '../store/fileManagement';
import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';

const Card = styled(Stack)(({ theme }) => ({}));

export function Files(data: { files: File[] | undefined; currentFolder: CurrentFolder | undefined }) {
  const [uploadFile, { isError, error }]: any = useUploadFileMutation();

  const handleUploadFile = (event: any) => {
    event.preventDefault();
    let file = new FormData();
    file.append('file', event.currentTarget.files[0]);
    uploadFile({ file, folderId: data?.currentFolder?.id });
  };
  console.log(data?.files);

  return (
    <Box sx={{ width: '100%' }}>
      <form>
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
                  boxShadow:
                    '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
                  display: 'flex',
                  p: 0
                }}>
                <input hidden id="file" name="file" multiple type="file" onChange={(e: any) => handleUploadFile(e)} />
                <Card>
                  <CardMedia
                    sx={{ height: 200, borderStartEndRadius: 4, borderTopLeftRadius: 4 }}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGmRN4uGF6GFsuUvEIQqtalPGbyFZBO1VlOw&s"
                  />
                  <CardContent>
                    <Typography variant="body1" component="div" noWrap>
                      {isError ? `${error.data.message}` : 'Add new file'}
                    </Typography>
                  </CardContent>
                </Card>
              </Button>
            </label>
          </Fragment>
          {data?.files?.map((file: File) => {
            return <FileCard file={file} />;
          })}
        </Grid>
      </form>
    </Box>
  );
}
