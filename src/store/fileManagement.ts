import { UserMainFolder } from "../types/userFile.types";
import { api } from "./apiSettings";

interface IFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

type UploadFile = {
    folderId: number,
    file: IFile
}

type RenameFile = {
    fileId: number,
    currentFolderId: number,
    name: string
}
type RenameFolder = {
    name: string,
    folderId: number
}

export const fileManagerApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUserHomePage: build.query<UserMainFolder, void>({
            query: () => ({
                url: `file-management`,
            }),
            providesTags: ['File', 'Folder']
        }),
        uploadFile: build.mutation<void, UploadFile>({
            query: (body) => ({
                url: `file-management/file/${body.folderId}`,
                method: "POST",
                body: body.file,
            }),
            invalidatesTags: ['File']
        }),
        createFolder: build.mutation({
            query: ({ folderId, name }: { folderId: number, name: string }) => ({
                url: `file-management/folder/${folderId}`,
                method: 'POST',
                body: { folderName: name }
            }),
            invalidatesTags: ['Folder']
        }),
        renameFile: build.mutation<void, RenameFile>({
            query: (data: RenameFile) => ({
                url: `file-management/file/${data.currentFolderId}/${data.fileId}`,
                method: 'PATCH',
                body: { newFileName: data.name }
            }),
            invalidatesTags: ['File']
        }),
        renameFolder: build.mutation({
            query: (data: RenameFolder) => ({
                url: `file-management/folder/${data.folderId}`,
                method: 'PATCH',
                body: { newFolderName: data.name }
            }),
            invalidatesTags: ['Folder']
        }),
        deleteFile: build.mutation({
            query: (data: { fileId?: number }) => ({
                url: `file-management/file`,
                method: 'DELETE',
                body: { fileId: data.fileId }
            }),
            invalidatesTags: ['File']
        }),
        deleteFolder: build.mutation({
            query: (data: { folderId?: number }) => ({
                url: `file-management/folder`,
                method: 'DELETE',
                body: { folderId: data.folderId }
            }),
            invalidatesTags: ['Folder']
        }),
        shareFile: build.mutation({
            query: () => ({
                url: `user`,
            }),
        }),
        shareFolder: build.mutation({
            query: () => ({
                url: `user`,
            }),
        }),
    }),
});

export const { useUploadFileMutation, useCreateFolderMutation, useGetUserHomePageQuery, useRenameFileMutation, useRenameFolderMutation, useDeleteFileMutation, useDeleteFolderMutation } = fileManagerApi;
