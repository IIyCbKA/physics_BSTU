import AccountAround from "../components/account/account_around";
import DefaultHeader from "../components/header/default_header/default_header";
import React, {useEffect, useState} from "react";
import TaskForm from "../components/account/create_task_form/task_form";
import {useDispatch, useSelector} from "react-redux";
import {getGroups, getTasksList} from "../actions/journal";
import {employeeStatus} from "../reducers/user_reducer";

export default function Account(){
    const userStatus = useSelector(state => state.user.currentUser.status)
    const [showTaskForm, setShowTaskForm] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const waitFunc = async () => {
            await dispatch(getGroups())
            await dispatch(getTasksList())
        }
        waitFunc()
    }, []);

    return (
        <div style={{backgroundColor: '#EBF0FF'}}>
            <DefaultHeader/>
            <AccountAround setShow={setShowTaskForm}/>
            {userStatus === employeeStatus &&
                <TaskForm show={showTaskForm} setShow={setShowTaskForm}/>
            }
        </div>
    )
}
