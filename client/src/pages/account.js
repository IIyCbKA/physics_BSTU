import AccountAround from "../components/account/account_around";
import DefaultHeader from "../components/header/default_header/default_header";
import {Helmet} from "react-helmet";
import React, {useEffect, useState} from "react";
import TaskForm from "../components/account/create_task_form/task_form";
import {useDispatch} from "react-redux";
import {getGroups, getTasksList} from "../actions/journal";

export default function Account(){
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
            <Helmet>
                <title>Профиль</title>
            </Helmet>
            <DefaultHeader/>
            <AccountAround setShow={setShowTaskForm}/>
            <TaskForm show={showTaskForm} setShow={setShowTaskForm}/>
        </div>
    )
}
