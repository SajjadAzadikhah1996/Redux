import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { userLoggedOut } from '@/_store/slice/authSlice';

export interface Reactions {
    thumbsUp: number;
    tada: number;
    heart: number;
    rocket: number;
    eyes: number;
}

export type ReactionName = keyof Reactions

// Define a TS type for the data we'll be using
export interface Post {
    id: string;
    title: string;
    content: string;
    user: string;
    date: string;
    reactions: Reactions;
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

const initialReactions: Reactions = {
    thumbsUp: 0,
    tada: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
};

// Create an initial state value for the reducer, with that type
const initialState: Post[] = [
    // {
    //     id: '1',
    //     title: 'First Post!',
    //     content: 'Hello!',
    //     user: '0',
    //     date: sub( new Date(), { minutes: 5 } ).toISOString(),
    //     reactions: initialReactions
    // },
    // {
    //     id: '2',
    //     title: 'Second Post',
    //     content: 'More text',
    //     user: '2',
    //     date: sub( new Date(), { minutes: 10 } ).toISOString(),
    //     reactions: initialReactions
    // }
];

// Create the slice and pass in the initial state
const postsSlice = createSlice( {
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(
            state,
            action: PayloadAction<{ postId: string; reaction: ReactionName }>
        ) {
            const { postId, reaction } = action.payload;
            const existingPost = state.find( post => post.id === postId );
            if ( existingPost ) {
                existingPost.reactions[ reaction ]++;
            }
        },
        postAdded: {
            reducer( state, action: PayloadAction<Post> ) {
                state.push( action.payload );
            },
            prepare( title: string, content: string, userId: string ) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: initialReactions
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
    },
    extraReducers: ( builder ) => {
        builder.addCase( userLoggedOut, ( state, action ) => {
            // Clear out the list of posts whenever the user logs out
            return [];
        } );
    }
} );

// Export the auto-generated action creator with the same name
export const { postAdded, reactionAdded, postUpdated } = postsSlice.actions;

// Export the slice selectors
export const { selectAllPosts, selectPostById, selectPostByUserId } = postsSlice.selectors;

// Export the generated reducer function
const { reducer: postReducer } = postsSlice;
export default postReducer;