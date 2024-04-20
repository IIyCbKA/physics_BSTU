import AccountAround from "../components/account/account_around";
import Header from "../components/header/header";
import {Helmet} from "react-helmet";
import React, {useState} from "react";
import TaskForm from "../components/account/create_task_form/task_form";

export default function Account(){
    const [showTaskForm, setShowTaskForm] = useState(false)

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