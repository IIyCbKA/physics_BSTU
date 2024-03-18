import {$host} from "../routes";
import {setUser} from "../reducers/user_reducer";

export const login = (email, password) => {
    return async (dispatch) => {
        try{
            const response = await $host.post('/api/login',
                {email, password})

            if (response.status === 200){
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
            const response = await $host.get('/api/token_auth',
                {headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')
                        }`}
                })

            if (response.data.success === true){
                console.log(response.data)
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
            } else {
                console.log(response.data)
            }
        } catch (e) {
            console.log(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
};