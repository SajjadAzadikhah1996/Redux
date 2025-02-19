import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { initialReactions, NewPost, Post } from '@/_store/slice/postSlice';

export const apiSlice = createApi( {
    reducerPath: 'api',
    tagTypes: [ 'POST' ],
    baseQuery: fetchBaseQuery( { baseUrl: '/fakeApi' } ),
    endpoints: builder => ( {
        getPosts: builder.query<Post[], void>( {
            query: () => ( {
                method: 'GET',
                url: 'http://localhost:9000/posts?_embed=user',
            } ),
            providesTags: [ 'POST' ]
        } ),
        getPost: builder.query<Post, string>( {
            query: ( postId ) => ( {
                method: 'GET',
                url: `http://localhost:9000/posts/${ postId }?_embed=user`,
            } ),
            providesTags: [ 'POST' ]
        } ),
        addNewPost: builder.mutation<Post, NewPost>( {
            query: initialPost => ( {
                url: 'http://localhost:9000/posts',
                method: 'POST',
                body: { ...initialPost, date: new Date().toISOString(), reactions: initialReactions }
            } ),
            invalidatesTags: [ 'POST' ]
        } )
    } )
} );

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } = apiSlice;