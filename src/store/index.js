import { configureStore } from "@reduxjs/toolkit";
import { usersReducers } from "./slices/userSlice";
import { albumsApi } from "./apis/albumsApi";
import { photoApis } from "./apis/photosApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer: {
        users: usersReducers,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photoApis.reducerPath]: photoApis.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photoApis.middleware)
    }
})

setupListeners(store.dispatch)

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/destroyUser';
export { useFetchAlbumsQuery, useCreateAlbumMutation, useDestroyAlbumMutation } from './apis/albumsApi'
export { useFetchPhotosQuery, useCreatePhotoMutation, useDestroyPhotoMutation } from './apis/photosApi'