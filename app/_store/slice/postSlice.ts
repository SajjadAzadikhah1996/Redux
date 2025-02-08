import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/_store/store';

// Define a TS type for the data we'll be using
export interface Post {
    id: string;
    title: string;
    content: string;
}

// Create an initial state value for the reducer, with that type
const initialState: Post[] = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
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
            prepare( title: string, content: string ) {
                return {
                    payload: { id: nanoid(), title, content }
                };
            }
        },
        postUpdated( state, action: PayloadAction<Post> ) {
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
        }
    }
} );

// Export the auto-generated action creator with the same name
export const { postAdded, postUpdated } = postsSlice.actions;

// Export the slice selectors
export const { selectAllPosts, selectPostById } = postsSlice.selectors;

// Export the generated reducer function
const { reducer: postReducer } = postsSlice;
export default postReducer;