import {$host} from "../routes";
import {setUser} from "../reducers/user_reducer";

export const login = (email, password) => {
    return async (dispatch) => {
        try{
            const response = await $host.post('/api/login',
                {email, password})

            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            console.log(response.data)
        }
        catch (e){
            alert(e.response.data.message)
        }
    }
};