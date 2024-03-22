import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../redux/features/themeslice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
});