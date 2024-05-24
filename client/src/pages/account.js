import AccountAround from "../components/account/account_around";
import DefaultHeader from "../components/header/default_header/default_header";
import React, {useEffect, useState} from "react";
import TaskForm from "../components/account/create_task_form/task_form";
import {useDispatch, useSelector} from "react-redux";
import {getGroups, getTasksList} from "../actions/journal";
import {employeeStatus} from "../reducers/user_reducer";
import "../server_files/sockets/journal"
import {socket} from "../server_files/sockets/socket_client";
import JournalTable from "../components/account/journal_table/journal_table";

export default function Account(){
    const userStatus = useSelector(state => state.user.currentUser.status)
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [showJournal, setShowJournal] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        const waitFunc = async () => {
            if (userStatus === 'employee')
                await dispatch(getGroups())
            await dispatch(getTasksList())
            await socket.init('journal', {})
        }
        waitFunc()
    }, [dispatch, userStatus]);

    return (
        <div style={{backgroundColor: '#EBF0FF'}}>
            <DefaultHeader/>
            <AccountAround
                setShowTaskForm={setShowTaskForm}
                setShowJournal={setShowJournal}
            />
            {userStatus === employeeStatus &&
                <React.Fragment>
                    <TaskForm show={showTaskForm} setShow={setShowTaskForm}/>
                    <JournalTable show={showJournal} setShow={setShowJournal}/>
                </React.Fragment>
            }
        </div>
    )
}
