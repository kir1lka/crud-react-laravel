import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: User = {
    name: "",
    email: "",
    password: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        removeUser(state) {
            state.name = null;
            state.email = null;
            state.password = null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
