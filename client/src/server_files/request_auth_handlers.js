import Cookies from "js-cookie";
import {logout} from "../reducers/user_reducer";
import {$host} from "./server_connect";


$host.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
