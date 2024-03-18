import {$host} from "../routes";
import {setUser} from "../reducers/user_reducer";

export const login = (email, password) => {
    return async (dispatch) => {
        try{
            console.log(123);
            const response = await $host.post('/api/login',
                {email, password})
            console.log(456)

            if (response.data.success === true){
                console.log(response.data)
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
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
            if (token == null)
                return
            const response = await $host.get('/api/auth_token',
                {headers: {
                        Authorization: `Bearer ${token}`}
                })

            console.log('status', response.status)
            if (response.status === 200){
                console.log('response data', response.data)
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
            } else {
                localStorage.removeItem('token')
                console.log(response.data)
            }
        } catch (e) {
            console.log(e)
            localStorage.removeItem('token')
        }
    }
};