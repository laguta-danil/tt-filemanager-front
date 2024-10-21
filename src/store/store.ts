import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth'
import { api } from './apiSettings'
import { fileManagerApi } from './fileManagement'


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [fileManagerApi.reducerPath]: fileManagerApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
