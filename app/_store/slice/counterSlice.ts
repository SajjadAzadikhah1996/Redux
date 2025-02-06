import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/_store/store';

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0
};

export const counterSlice = createSlice( {
    name: 'counter',
    initialState,
    reducers: {
        increment: ( state, action: PayloadAction<number> ) => {
            state.value += action.payload;
        },
        decrement: ( state, action: PayloadAction<number> ) => {
            state.value -= action.payload;
        },
        reset: ( state ) => {
            state.value = initialState.value;
        }
    }
} );

/* Actions */
export const { increment, decrement, reset } = counterSlice.actions;

/* Selectors */
export const selectCount = ( state: RootState ) => state.counter.value;

/* Reducer */
const { reducer: counterReducer } = counterSlice;
export default counterReducer;