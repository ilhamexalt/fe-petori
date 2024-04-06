import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isLoggedIn: false,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // Define reducers here if needed
    },
});

export const { actions, reducer } = counterSlice;