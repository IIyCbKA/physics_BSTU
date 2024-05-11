import {SwitchTransition, CSSTransition} from "react-transition-group";
import './styles/style_root_account.css'
import CreateTask from "../employees/create_task_btn/create_task_btn";
import ListingTask from "../listing_tasks/listing_task";
import Head from "../listing_tasks/head/head";
import {employeeStatus} from "../../../reducers/user_reducer";
import {useSelector} from "react-redux";
import React, {useState} from "react";
import AccountHead from "../head/head";


export default function RootAccount(props){
    const userStatus = useSelector(state => state.user.currentUser.status)
    const firstText = 'Задания'
    const secondText = userStatus === employeeStatus ? 'Оценки' : 'Профиль'
    const [onFirstSelected, changeFirstSelected] = useState(true);
    const [onSecondSelected, changeSecondSelected] = useState(false);

    return(
        <div className='account-main'>
            <div className='account-root-content-inner'>
                <div className='account-root-content-container'>
                    <AccountHead firstText={firstText} secondText={secondText}
                        onFirstSelected={onFirstSelected}
                        changeFirstSelected={changeFirstSelected}
                        onSecondSelected={onSecondSelected}
                        changeSecondSelected={changeSecondSelected}
                    />
                    <div className='account-info-wrap'>
                        <div className='account-info-main'>
                            <SwitchTransition mode="out-in">
                                <CSSTransition
                                    key={onFirstSelected ? 'tasks' : 'evaluations'}
                                    in={onFirstSelected}
                                    timeout={200}
                                    classNames="account-transition"
                                >
                                    {onFirstSelected ?
                                        <div className='account-tasks-main'>
                                            {userStatus === employeeStatus &&
                                                <CreateTask setShow={props.setShow}/>
                                            }
                                            <Head/>
                                            <ListingTask/>
                                        </div> :
                                        <div></div>
                                    }
                                </CSSTransition>
                            </SwitchTransition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}