import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/_store/store';
import { createAppAsyncThunk } from '@/_store/withType';
import { User } from '@/_store/slice/userSlice';

interface AuthState {
    status: 'idle' | 'pending',
    user: User | null;
}

const initialState: AuthState = {
    // Note: a real app would probably have more complex auth state,
    // but for this example we'll keep things simple
    status: 'idle',
    user: null
};

export const getUser = createAppAsyncThunk(
    'auth/user',
    async (): Promise<User> => {
        const res = await fetch( 'http://localhost:9000/auth', {
            method: 'GET',
        } );
        return res.json();
    }
);

export const login = createAppAsyncThunk(
    'auth/login',
    async ( user: User ): Promise<User> => {
        const res = await fetch( 'http://localhost:9000/auth', {
            method: 'PUT',
            body: JSON.stringify( user )
        } );
        return res.json();
    }
);

export const logout = createAppAsyncThunk( 'auth/logout', async () => {
    const res = await fetch( 'http://localhost:9000/auth', {
        method: 'PUT',
        body: null
    } );
    return res.json();
} );

const authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // and handle the thunk actions instead
        builder
            .addCase( getUser.pending, ( state, action ) => {
                state.status = 'pending';
            } )
            .addCase( getUser.fulfilled, ( state, action ) => {
                state.status = 'idle';
                if ( Object.keys( action.payload ).length > 0 )
                    state.user = action.payload;
            } )
            .addCase( login.fulfilled, ( state, action ) => {
                state.user = action.payload;
            } )
            .addCase( logout.fulfilled, state => {
                state.user = null;
            } );
    }
} );

export const selectCurrentUser = ( state: RootState ): User | null => state.auth.user;
export const selectAuthStatus = ( state: RootState ): 'idle' | 'pending' => state.auth.status;

const { reducer: authReducer } = authSlice;
export default authReducer;