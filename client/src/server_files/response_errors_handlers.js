import {$host} from "./server_connect";
import {refreshTokenAuth} from "../actions/user";
import {store} from "../reducers/index";

$host.interceptors.response.use(
    response => {
        return response;
    },

    async error => {
        const originalRequest = error.config;

        const detail = error.response.data.detail

        if (error.response.status === 401 && !originalRequest._retry &&
            (detail === 'Could not validate credentials by token' ||
            detail === 'Not authenticated')) {
            originalRequest._retry = true;

            if (localStorage.getItem('token'))
                localStorage.removeItem('token')

            await store.dispatch(refreshTokenAuth())

            const token = localStorage.getItem('token')
            if (token){
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return $host(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);
