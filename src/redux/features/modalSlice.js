import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    data: []
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        saveModal: (state, action) => {
            // You can handle saving data here
            console.log('Saved:', action.payload);
            state.data = action.payload;
            state.isOpen = false; // Close modal after saving
        },
    },
});

export const { openModal, closeModal, saveModal } = modalSlice.actions;
export default modalSlice.reducer;