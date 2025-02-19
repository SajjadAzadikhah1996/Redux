import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/_store/store';
import { createAppAsyncThunk } from '@/_store/withType';

export interface User {
    id: string;
    name: string;
}

const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAppAsyncThunk( 'users/fetchUsers', async (): Promise<User[]> => {
    const res = await fetch( 'http://localhost:9000/users' );
    return res.json();
} );

const usersSlice = createSlice( {
    name: 'users',
    initialState,
    reducers: {},
    extraReducers( builder ) {
        builder.addCase( fetchUsers.fulfilled, usersAdapter.setAll );
    }
} );

const { reducer: userReducer } = usersSlice;
export default userReducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
    usersAdapter.getSelectors( ( state: RootState ) => state.users );
