import { faker } from '@faker-js/faker'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const photoApis = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001',
    }),
    endpoints(builder) {
        return {
            fetchPhotos: builder.query({
                providesTags: (result, error, args) => {
                    const tags = result.map(photo => {
                        return { type: 'Photo', id: photo.id }
                    })
                    tags.push({ type: 'AlbumPhoto', id: args.id })
                    return tags;
                },
                query: (args) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: args.id
                        },
                        method: 'GET'
                    }
                }

            }),
            createPhoto: builder.mutation({
                invalidatesTags: (result, error, args) => {
                    return [{ type: 'AlbumPhoto', id: args.id }]
                },
                query: (args) => {
                    return {
                        url: '/photos',
                        body: {
                            albumId: args.id,
                            url: faker.image.abstract(150, 150, true)
                        },
                        method: 'POST',
                    }
                }

            }),
            destroyPhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: 'Photo', id: photo.id }]
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE'

                    }
                }
            })
        }
    }
})

export const { useFetchPhotosQuery, useCreatePhotoMutation, useDestroyPhotoMutation } = photoApis;