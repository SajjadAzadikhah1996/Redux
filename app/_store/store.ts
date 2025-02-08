import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import postReducer from '@/_store/slice/postSlice';

const store = configureStore( {
    reducer: {
        posts: postReducer
    }
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