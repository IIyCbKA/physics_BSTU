import {$host} from "../server_files/server_connect";
import {logout, setUser} from "../reducers/user_reducer";
import Cookies from 'js-cookie';

const REFRESH_TOKEN_EXPIRE_DAYS = 30

export const login = (email, password) => {
    return async (dispatch) => {
        try{
            const response = await $host.post('/api/login',
                {email, password})

            if (response.data.success === true){
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
                Cookies.set('refresh_token', response.data.refresh_token,
                           { expires: REFRESH_TOKEN_EXPIRE_DAYS })
            } else {
                console.log(response.data)
            }
        }
        catch (e){
            alert(e.response.data.message)
        }
    }
};


export const auth = () => {
    return async (dispatch) => {
        try{
            const response = await $host.get('/api/auth_token')

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
            const response = await $host.get('/api/auth_refresh_token',
                {headers: {
                        Authorization: `Bearer ${refreshToken}`}
                })

            if (response.status === 200){
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.user.token)
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


const cleanUserInfo = () => {
    return async (dispatch) => {
        localStorage.removeItem('token')
        Cookies.remove('refresh_token')
        dispatch(logout())
    }
}