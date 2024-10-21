import { UserMainFolder } from "../types/userFile.types";
import { api } from "./apiSettings";

export const fileManagerApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUserHomePage: build.query<UserMainFolder, void>({
            query: () => ({
                url: `file-management`,
            }),
            providesTags: ['File', 'Folder']
        }),
        uploadFile: build.mutation<any, any>({
            query: (body) => ({
                url: `file-management/file/${body.folderId}`,
                method: "POST",
                body: body.file,
            }),
            invalidatesTags: ['File']
        }),
        createFolder: build.mutation({
            query: ({ folderId, folderName }: { folderId: number, folderName: string }) => ({
                url: `file-management/folder/${folderId}`,
                method: 'POST',
                body: { folderName }
            }),
            invalidatesTags: ['Folder']
        }),
        renameFile: build.mutation<void, void>({
            query: () => ({
                url: `auth/logout`,
            }),
        }),
        renameFolder: build.mutation({
            query: () => ({
                url: `user`,
            }),
        }),
        deleteFile: build.mutation({
            query: () => ({
                url: `user`,
            }),
        }),
        deleteFolder: build.mutation({
            query: () => ({
                url: `user`,
            }),
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

export const { useUploadFileMutation, useCreateFolderMutation, useGetUserHomePageQuery, useRenameFileMutation, useRenameFolderMutation } = fileManagerApi;
