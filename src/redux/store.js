import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../redux/features/themeslice';
import modalReducer from '../redux/features/modalSlice';


export const store = configureStore({
    reducer: {
        theme: themeReducer,
        modal: modalReducer
    },
});