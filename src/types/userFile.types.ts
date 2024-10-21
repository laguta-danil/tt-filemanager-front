export type UserMainFolder = {
    curentFolder: CurrentFolder;
    files: File[];
    folders: Folder[];
};

export type CurrentFolder = { id: number; folderName: string; userId: number; mainFolder?: boolean }

export type File = {
    id: number;
    folderId: number;
    fileId: number;
    fileName: string;
    previewImg: string
};

export type Folder = {
    id: number;
    folderId: number;
    folderInsideName: number;
    folderName: string;
};