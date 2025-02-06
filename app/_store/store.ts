import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from '@/app/_store/slice/counterSlice';

const store = configureStore( {
    reducer: {
        counter: counterReducer
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