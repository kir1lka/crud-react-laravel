import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Auth = {
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
        },
        removeAccessToken(state) {
            console.log("token" + state.accessToken);
            state.accessToken = null;
        },
    },
});

export const { addAccessToken, removeAccessToken } = authSlice.actions;

export default authSlice.reducer;
