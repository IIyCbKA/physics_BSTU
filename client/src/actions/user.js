import {$host} from "../server_files/server_connect";
import {logout, setUser} from "../reducers/user_reducer";
import Cookies from 'js-cookie';
import {
    AUTH_BY_REFRESH_TOKEN_URL,
    AUTH_BY_TOKEN_URL,
    LOGIN_URL, REFRESH_TOKEN_EXPIRE_DAYS
} from "../constants";

export const login = (email, password) => {
    return async (dispatch) => {
        try{
            const response = await $host.post(LOGIN_URL,
                {email, password})

            if (response.data.success === true){
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
                Cookies.set('refresh_token', response.data.refresh_token,
                           { expires: REFRESH_TOKEN_EXPIRE_DAYS })
                return true
            } else {
                return false
            }
        }
        catch (e){
            return false
        }
    }
};


export const auth = () => {
    return async (dispatch) => {
        try{
            const response = await $host.get(AUTH_BY_TOKEN_URL)

            if (response.status === 200){
                dispatch(setUser(response.data.user))
            }
        } catch (e) {
            console.log(e)
        }
    }
};


export const refreshTokenAuth = (refreshToken) => {
    return async (dispatch) => {
        try{
            const response = await $host.get(AUTH_BY_REFRESH_TOKEN_URL,
                {headers: {
                        Authorization: `Bearer ${refreshToken}`}
                })

            if (response.status === 200){
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
                Cookies.set('refresh_token', response.data.refresh_token,
                           { expires: REFRESH_TOKEN_EXPIRE_DAYS });
            } else {
                dispatch(cleanUserInfo())
            }
        } catch (e){
            dispatch(cleanUserInfo())
        }
    }
}


export const cleanUserInfo = () => {
    return async (dispatch) => {
        localStorage.removeItem('token')
        Cookies.remove('refresh_token')
        dispatch(logout())
    }
}
