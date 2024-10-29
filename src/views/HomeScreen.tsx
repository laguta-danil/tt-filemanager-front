import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetUserHomePageQuery } from '../store/fileManagement';
import { CurrentFolder, File, Folder } from '../types/userFile.types';
import { Files } from '../components/Files';
import { Folders } from '../components/Folders';
import { Header } from '../components/Header';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavPanel } from '../components/NavPanel';

export function HomeScreen() {
  const [files, setFiles] = useState<File[]>();
  const [folders, setFolders] = useState<Folder[]>();
  const [search, setSearch] = useState('');
  const [sortByFileName, setSortByNameFiles] = useState<'asc' | 'desc'>('asc');
  const [sortByFolderName, setSortByNameFolders] = useState<'asc' | 'desc'>('asc');
  const [take, setTake] = useState(12);

  const [currentFolder, setCurrentFolder] = useState<CurrentFolder | undefined>();
  const location = useLocation();

  const path = location.pathname;

  const { data, isLoading } = useGetUserHomePageQuery({
    search,
    sortByFileName,
    sortByFolderName,
    take,
    mainPage: path === '/home' ? 'true' : '',
    folderId: path === '/home' ? 0 : Number(path.substring(path.lastIndexOf('/') + 1))
  });

  console.log();

  useEffect(() => {
    setFiles(data?.files);
    setFolders(data?.folders);
    setCurrentFolder(data?.curentFolder);
  }, [data]);

  return (
    <Box sx={{ width: '80%' }} pt={1}>
      <Header searchValue={search} setSearch={setSearch} />
      <Box pt={1}>
        <NavPanel
          path={path}
          take={take}
          setSortByNameFiles={setSortByNameFiles}
          sortByFileName={sortByFileName}
          sortByFolderName={sortByFolderName}
          setSortByNameFolders={setSortByNameFolders}
          setTake={setTake}
        />
      </Box>
      <Box pb={1} pt={1}>
        <Files files={files} currentFolder={currentFolder} isParentLoading={isLoading} />
      </Box>
      <Box>
        <Folders folders={folders} currentFolder={currentFolder} isParentLoading={isLoading} />
      </Box>
    </Box>
  );
}
