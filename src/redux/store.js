import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../redux/features/counterSlice';

export const store = configureStore({
    reducer: {
        counter: reducer,
    },
});

