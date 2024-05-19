import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosManager from "../axios-client";
import { showToast } from "../components/Toast";

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

export const getUsersShow = createAsyncThunk<
    User | null,
    string | undefined | null,
    { rejectValue: string }
>("users/getUsersShow", async function (id, { rejectWithValue }) {
    try {
        if (id) {
            const response = await axiosManager.get(`/users/${id}`);
            return response.data;
        }
        return null;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const usersDelete = createAsyncThunk<
    number | null,
    number,
    { rejectValue: string }
>("users/deleteUser", async function (id, { rejectWithValue }) {
    try {
        if (id) {
            await axiosManager.delete(`/users/${id}`);
            return id;
        }
        return null;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const updateUser = createAsyncThunk<User, User, { rejectValue: any }>(
    "users/updateUser",
    async function (user, { rejectWithValue }) {
        try {
            const response = await axiosManager.put(`/users/${user.id}`, user);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const createUser = createAsyncThunk<
    User,
    Omit<User, "id" | "created_at" | "updated_at">,
    { rejectValue: any }
>("users/createUser", async function (user, { rejectWithValue }) {
    try {
        const response = await axiosManager.post(`/users`, user);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 422) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
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
            })

            // getUserShow
            .addCase(getUsersShow.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsersShow.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                if (action.payload) {
                    state.users.data = [action.payload];
                } else {
                    state.users.data = [];
                }
            })
            .addCase(getUsersShow.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            })

            //delteUsers
            .addCase(usersDelete.fulfilled, (state, action) => {
                if (action.payload) {
                    state.users.data = state.users.data.filter(
                        (user) => user.id !== action.payload
                    );
                    showToast("Пользователь был удален!", "delete");
                }
            })

            //updateUser
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const index = state.users.data.findIndex(
                    (u) => u.id === action.payload.id
                );
                if (index !== -1) {
                    state.users.data[index] = action.payload;
                }
                showToast("Пользователь был обновлен!", "success");
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.error = action.payload.errors || action.payload;
                } else {
                    state.error = action.error.message;
                }
            })

            //createUser
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                state.users.data.push(action.payload);
                showToast("Пользователь был создан!", "success");
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.error = action.payload.errors || action.payload;
                } else {
                    state.error = action.error.message;
                }
            });
    },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
