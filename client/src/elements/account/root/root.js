import {SwitchTransition, CSSTransition} from "react-transition-group";
import './styles/style_root_account.css'
import CreateTask from "../employees/create_task_btn/create_task_btn";
import ListingTask from "../listing_tasks/listing_task";
import TasksHead from "../listing_tasks/head/head";
import {employeeStatus} from "../../../reducers/user_reducer";
import {useSelector} from "react-redux";
import UserInfo from "../user_info/user_info";
import ListingWork from "../students/profile_listing_tasks/listing_works";


export default function RootAccount(props){
    const userStatus = useSelector(state => state.user.currentUser.status)

    return(
        <div className='account-info-wrap'>
            <div className='account-info-main'>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={props.onFirstSelected ? 'tasks' : 'evaluations'}
                        in={props.onFirstSelected}
                        timeout={150}
                        classNames="account-transition"
                    >
                        {props.onFirstSelected ?
                            <div className='account-tasks-main'>
                                {userStatus === employeeStatus &&
                                    <CreateTask setShow={props.setShow}/>
                                }
                                <TasksHead/>
                                <ListingTask/>
                            </div> :
                            <div className='account-evaluation-main'>
                                <UserInfo/>
                                {userStatus === 'student' &&
                                    <ListingWork/>
                                }
                            </div>
                        }
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    )
}