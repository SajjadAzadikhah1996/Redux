import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import postReducer from '@/_store/slice/postSlice';
import userReducer from '@/_store/slice/userSlice';
import authReducer from '@/_store/slice/authSlice';
import { apiSlice } from '@/_store/api';

const store = configureStore( {
    reducer: {
        auth: authReducer,
        posts: postReducer,
        users: userReducer,
        [ apiSlice.reducerPath ]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat( apiSlice.middleware )
} );

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>

export default store;