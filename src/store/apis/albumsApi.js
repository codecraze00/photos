import { faker } from '@faker-js/faker'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001',
        // TESTING ONLY
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints(builder) {
        return {
            fetchAlbums: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result.map(album => {
                        return { type: 'album', id: album.id }
                    })
                    tags.push({ type: 'usersAlbums', id: user.id })
                    return tags;
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method: 'GET'
                    }
                }
            }),
            createAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => [{ type: 'usersAlbums', id: user.id }],
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),
            destroyAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'album', id: album.id }]
                },
                query: (album) => {
                    return {
                        method: 'DELETE',
                        url: `/albums/${album.id}`
                    }
                }
            })
        }
    }
})

// TESTING ONLY
const pause = (delay) => new Promise(resolve => setTimeout(resolve, delay))

export const { useFetchAlbumsQuery, useCreateAlbumMutation, useDestroyAlbumMutation } = albumsApi;
