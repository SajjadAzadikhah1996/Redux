import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

// Define a TS type for the data we'll be using
export interface Post {
    id: string;
    title: string;
    content: string;
    user: string;
    date: string;
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

// Create an initial state value for the reducer, with that type
const initialState: Post[] = [
    {
        id: '1',
        title: 'First Post!',
        content: 'Hello!',
        user: '0',
        date: sub( new Date(), { minutes: 5 } ).toISOString()
    },
    {
        id: '2',
        title: 'Second Post',
        content: 'More text',
        user: '2',
        date: sub( new Date(), { minutes: 10 } ).toISOString()
    }
];

// Create the slice and pass in the initial state
const postsSlice = createSlice( {
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer( state, action: PayloadAction<Post> ) {
                state.push( action.payload );
            },
            prepare( title: string, content: string, userId: string ) {
                return {
                    payload: {
                        id: nanoid(), date: new Date().toISOString(), title, content, user: userId
                    }
                };
            }
        },
        postUpdated( state, action: PayloadAction<PostUpdate> ) {
            const { id, title, content } = action.payload;
            const existingPost = state.find( post => post.id === id );
            if ( existingPost ) {
                existingPost.title = title;
                existingPost.content = content;
            }
        }
    },
    selectors: {
        selectAllPosts: ( postState ) => postState,

        selectPostById: ( postState, postId: string ) => {
            return postState.find( post => post.id === postId );
        },

        selectPostByUserId: ( postState, userId: string ) => {
            return postState.filter( post => post.user === userId );
        }
    }
} );

// Export the auto-generated action creator with the same name
export const { postAdded, postUpdated } = postsSlice.actions;

// Export the slice selectors
export const { selectAllPosts, selectPostById, selectPostByUserId } = postsSlice.selectors;

// Export the generated reducer function
const { reducer: postReducer } = postsSlice;
export default postReducer;