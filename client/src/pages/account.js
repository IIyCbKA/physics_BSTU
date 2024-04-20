import AccountAround from "../components/account/account_around";
import Header from "../components/header/header";
import {Helmet} from "react-helmet";
import React, {useEffect, useState} from "react";
import TaskForm from "../components/account/create_task_form/task_form";
import {useDispatch} from "react-redux";
import {getGroups} from "../actions/journal";

export default function Account(){
    const [showTaskForm, setShowTaskForm] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const waitFunc = async () => {
            await dispatch(getGroups())
        }
        waitFunc()
    }, [dispatch]);

    return (
        <div style={{backgroundColor: '#EBF0FF'}}>
            <Helmet>
                <title>Профиль</title>
            </Helmet>
            <Header/>
            <AccountAround setShow={setShowTaskForm}/>
            <TaskForm show={showTaskForm} setShow={setShowTaskForm}/>
        </div>
    )
}
