import './styles/style_user_info.css'
import {useSelector} from "react-redux";
import {employeeStatus} from "../../../reducers/user_reducer";

export default function UserInfo(){
    const userInfo = useSelector(state => state.user.currentUser)
    const text = `${userInfo.surname} ${userInfo.name} 
    ${userInfo.status !== employeeStatus ? ' ' + userInfo.group : ''}`

    return (
        <div className='user-info-wrap'>
            <div className='user-info-text'>
                {text}
            </div>
        </div>
    )
}