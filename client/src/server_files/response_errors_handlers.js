import Cookies from "js-cookie";
import {logout} from "../reducers/user_reducer";
import {$host} from "./server_connect";

$host.interceptors.response.use(
    response => {
        return response;
    },

    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry &&
            error.response.detail === 'Could not validate credentials by token') {
            originalRequest._retry = true;

            const refreshToken = Cookies.get('refresh_token');
            const response = await $host.get('/api/auth_refresh_token',
                {headers: {
                        Authorization: `Bearer ${refreshToken}`}
                });

            if (response.status === 200){
                const newToken = response.data.token;
                localStorage.setItem('token', newToken);
                Cookies.set('refresh_token', response.data.refresh_token)
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return $host(originalRequest);
            } else{
                logout()
            }
        }

        return Promise.reject(error);
    }
);
