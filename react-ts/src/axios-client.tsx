import axios from "axios";
import store from "./store";
import { removeAccessToken } from "./store/authSlice";

const axiosManager = axios.create({
    baseURL: `http://127.0.0.1:8001/api`,
});

axiosManager.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosManager.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            store.dispatch(removeAccessToken());
        }
        throw error;
    }
);

export default axiosManager;
