import {$host} from "../server_files/server_connect";
import {setUser} from "../reducers/user_reducer";
import Cookies from 'js-cookie';

export const login = (email, password) => {
    return async (dispatch) => {
        try{
            const response = await $host.post('/api/login',
                {email, password})

            if (response.data.success === true){
                console.log(response.data)
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
                Cookies.set('refresh_token', response.data.refresh_token)
            } else {
                console.log(response.data)
            }
        }
        catch (e){
            alert(e.response.data.message)
        }
    }
};


export const auth = () =>{
    return async (dispatch) => {
        try{
            const token = localStorage.getItem('token')
            if (token == null){
                return
            }

            const response = await $host.get('/api/auth_token')

            if (response.status === 200){
                dispatch(setUser(response.data.user))
            }
        } catch (e) {
            console.log(e)
        }
    }
};


//const refreshTokenAuth = () => {
//    return async (dispatch) => {
//        try{
//            const refreshToken = Cookies.get('refresh_token')
//
//            if (refreshToken == null){
//                return
//            }
//            const response = await $host.get('/api/auth_refresh_token',
//                {headers: {
//                        Authorization: `Bearer ${refreshToken}`}
//                })
//
//            if (response.status === 200){
//                dispatch(setUser(response.data.user))
//                localStorage.setItem('token', response.data.token)
//                Cookies.set('refresh_token', response.data.refresh_token)
//            } else {
//                Cookies.remove('refresh_token')
//            }
//        } catch (e){
//            Cookies.remove('refresh_token')
//        }
//    }
//}