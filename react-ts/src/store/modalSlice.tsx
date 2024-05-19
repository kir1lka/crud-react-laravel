import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isOpen: boolean;
    id: number | null;
}

const initialState: ModalState = {
    isOpen: false,
    id: 0,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<number>) => {
            state.isOpen = true;
            state.id = action.payload;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.id = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
