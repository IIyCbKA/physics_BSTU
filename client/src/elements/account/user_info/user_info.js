import './styles/style_user_info.css'
import {useSelector} from "react-redux";
import {EMPLOYEE_USER_STATUS} from "../../../constants";

export default function UserInfo(){
    const userInfo = useSelector(state => state.user.currentUser)
    const text = `${userInfo.surname} ${userInfo.name} 
    ${userInfo.status !== EMPLOYEE_USER_STATUS ? ' ' + userInfo.group : ''}`

    return (
        <div className='user-info-wrap'>
            <div className='user-info-text'>
                {text}
            </div>
        </div>
    )
}