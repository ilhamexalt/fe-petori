import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import modalReducer from './features/modalSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        modal: modalReducer,
    },
});

