import axios from "axios";
import store from "./store";
import { removeAccessToken } from "./store/authSlice";

const axiosManager = axios.create({
    baseURL: `http://127.0.0.1:8000/api`,
});

// axiosManager.interceptors.request.use((config) => {
//     const token = useAppSelector((state) => state.auth.accessToken);
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });

// axiosManager.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         try {
//             const { response } = error;
//             if (response.status === 401) {
//                 const dispatch = useAppDispatch();
//                 dispatch(removeAccessToken());
//             }
//             throw error;
//         } catch (e) {
//             console.log(e);
//             throw e;
//         }
//     }
// );

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

// axiosManager.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// axiosManager.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         const { response } = error;
//         if (response.status === 401) {
//             localStorage.removeItem("token");
//             // после удаления токена, вы можете перенаправить пользователя на страницу входа
//         }
//         throw error;
//     }
// );

export default axiosManager;
