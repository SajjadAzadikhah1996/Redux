import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/_store/store';
import { createAppAsyncThunk } from '@/_store/withType';

export interface User {
    id: string;
    name: string;
}

const initialState: User[] = [];

export const fetchUsers = createAppAsyncThunk( 'users/fetchUsers', async (): Promise<User[]> => {
    const res = await fetch( 'http://localhost:9000/users' );
    return res.json();
} );

const usersSlice = createSlice( {
    name: 'users',
    initialState,
    reducers: {},
    extraReducers( builder ) {
        builder.addCase( fetchUsers.fulfilled, ( state, action ) => {
            return action.payload;
        } );
    }
} );

const { reducer: userReducer } = usersSlice;
export default userReducer;

export const selectAllUsers = ( state: RootState ) => state.users;

export const selectUserById = ( state: RootState, userId: string | null ) =>
    state.users.find( user => user.id === userId );