import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetUserHomePageQuery } from '../store/fileManagement';
import { CurrentFolder, File, Folder } from '../types/userFile.types';
import { Files } from '../components/Files';
import { Folders } from '../components/Folders';
import { Header } from '../components/Header';
import React from 'react';

export function HomeScreen() {
  const [files, setFiles] = useState<File[]>();
  const [folders, setFolders] = useState<Folder[]>();
  const [currentFolder, setCurrentFolder] = useState<CurrentFolder | undefined>();

  const { data, isLoading } = useGetUserHomePageQuery();

  useEffect(() => {
    setFiles(data?.files);
    setFolders(data?.folders);
    setCurrentFolder(data?.curentFolder);
  });

  return (
    <Box sx={{ width: '80%' }} pt={1}>
      <Header />
      <Box pb={1} pt={1}>
        <Files files={files} currentFolder={currentFolder} isParentLoading={isLoading} />
      </Box>
      <Box>
        <Folders folders={folders} currentFolder={currentFolder} isParentLoading={isLoading} />
      </Box>
    </Box>
  );
}
