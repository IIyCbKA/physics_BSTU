import {$host} from "./server_connect";
import {refreshTokenAuth} from "../actions/user";
import {store} from "../reducers/index";
import Cookies from "js-cookie";
import {logout} from "../reducers/user_reducer";

$host.interceptors.response.use(
    response => {
        return response;
    },

    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            localStorage.removeItem('token')
            const refreshToken = Cookies.get('refresh_token')

            if (refreshToken){
                Cookies.remove('refresh_token')
                await store.dispatch(refreshTokenAuth(refreshToken))
                const token = localStorage.getItem('token')

                if (token){
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return $host(originalRequest);
                } else{
                    store.dispatch(logout())
                }
            } else {
                store.dispatch(logout())
            }
        }

        return Promise.reject(error);
    }
);
