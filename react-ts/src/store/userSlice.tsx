import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosManager from "../axios-client";

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null | undefined;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const getUser = createAsyncThunk<
    User,
    undefined,
    { rejectValue: string }
>("user/getUser", async function (_, { rejectWithValue }) {
    try {
        const response = await axiosManager.get("/user");
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        removeUser(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
