import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logout, selectCurrentUser } from '@/_store/slice/authSlice';
import { createAppAsyncThunk } from '@/_store/withType';
import { User } from '@/_store/slice/userSlice';

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
    userId: string;
    user: User;
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

interface PostsState {
    posts: Post[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PostsState = {
    posts: [],
    status: 'idle',
    error: null
};

export const fetchPosts = createAppAsyncThunk( 'posts/fetchPosts', async (): Promise<Post[]> => {
    const res = await fetch( 'http://localhost:9000/posts?_embed=user', { method: 'GET' } );
    return res.json();
}, {
    condition( arg, thunkApi ) {
        const postsStatus = selectPostsStatus( thunkApi.getState() );
        if ( postsStatus !== 'idle' ) {
            return false;
        }
    }
} );

type NewPost = Pick<Post, 'title' | 'content' | 'userId'>

export const addNewPost = createAppAsyncThunk(
    'posts/addNewPost',
    // The payload creator receives the partial `{title, content, user}` object
    async ( initialPost: NewPost, { getState } ): Promise<Post> => {
        // We send the initial data to the fake API server
        const res = await fetch( 'http://localhost:9000/posts?_embed=user', {
            method: 'POST',
            body: JSON.stringify( { ...initialPost, date: new Date().toISOString(), reactions: initialReactions } )
        } );
        const user = selectCurrentUser( getState() );
        // The response includes the complete post object, including unique ID
        const data = await res.json();
        return { ...data, user };
    }
);

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
            const existingPost = state.posts.find( post => post.id === postId );
            if ( existingPost ) {
                existingPost.reactions[ reaction ]++;
            }
        },
        postUpdated( state, action: PayloadAction<PostUpdate> ) {
            const { id, title, content } = action.payload;
            const existingPost = state.posts.find( post => post.id === id );
            if ( existingPost ) {
                existingPost.title = title;
                existingPost.content = content;
            }
        }
    },
    selectors: {
        selectAllPosts: ( postState ) => postState.posts,

        selectPostById: ( postState, postId: string ) => {
            return postState.posts.find( post => post.id === postId );
        },

        selectPostByUserId: ( postState, userId: string ) => {
            return postState.posts.filter( post => post.userId === userId );
        },
        selectPostsStatus: ( state ) => state.status,
        selectPostsError: ( state ) => state.error
    },
    extraReducers: ( builder ) => {
        builder.addCase( logout.fulfilled, ( state, action ) => {
            // Clear out the list of posts whenever the user logs out
            return initialState;
        } )
            .addCase( fetchPosts.pending, ( state, action ) => {
                state.status = 'pending';
            } )
            .addCase( fetchPosts.fulfilled, ( state, action ) => {
                state.status = 'succeeded';
                // Add any fetched posts to the array
                state.posts.push( ...action.payload );
            } )
            .addCase( fetchPosts.rejected, ( state, action ) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown Error';
            } );
        builder
            // omit the cases for `fetchPosts` and `userLoggedOut`
            .addCase( addNewPost.fulfilled, ( state, action ) => {
                // We can directly add the new post object to our posts array
                state.posts.push( action.payload );
            } );
    }
} );

// Export the auto-generated action creator with the same name
export const { reactionAdded, postUpdated } = postsSlice.actions;

// Export the slice selectors
export const {
    selectAllPosts,
    selectPostById,
    selectPostByUserId,
    selectPostsStatus,
    selectPostsError
} = postsSlice.selectors;

// Export the generated reducer function
const { reducer: postReducer } = postsSlice;
export default postReducer;