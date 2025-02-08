import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/_store/store';

interface User {
    id: string;
    name: string;
}

const initialState: User[] = [
    { id: '0', name: 'Tianna Jenkins' },
    { id: '1', name: 'Kevin Grant' },
    { id: '2', name: 'Madison Price' }
];

const usersSlice = createSlice( {
    name: 'users',
    initialState,
    reducers: {}
} );

const { reducer: userReducer } = usersSlice;
export default userReducer;

export const selectAllUsers = ( state: RootState ) => state.users;

export const selectUserById = ( state: RootState, userId: string ) =>
    state.users.find( user => user.id === userId );