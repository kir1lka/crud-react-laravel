import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosManager from "../axios-client";

interface UsersState {
    users: {
        data: User[];
    };
    meta: {
        current_page: number;
        per_page: number;
        last_page: number;
    };
    loading: boolean;
    error: string | null | undefined;
}

const initialState: UsersState = {
    users: {
        data: [],
    },
    meta: {
        current_page: 1,
        per_page: 1,
        last_page: 1,
    },
    loading: false,
    error: null,
};

export const getUsers = createAsyncThunk<
    {
        data: User[];
        current_page: number;
        per_page: number;
        last_page: number;
    },
    number,
    { rejectValue: string }
>("users/getUsers", async function (page, { rejectWithValue }) {
    try {
        const response = await axiosManager.get(`/users?page=${page}`);
        const { data, meta } = response.data;
        return {
            data,
            current_page: meta.current_page,
            per_page: meta.per_page,
            last_page: meta.last_page,
        };
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                state.users.data = action.payload.data;
                state.meta = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            });
    },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
