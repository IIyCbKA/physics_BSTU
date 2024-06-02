import AccountAround from "../components/account/account_around";
import DefaultHeader from "../components/header/default_header/default_header";
import React, {useEffect, useState} from "react";
import TaskForm from "../components/account/create_task_form/task_form";
import {useDispatch, useSelector} from "react-redux";
import {getGroups, getTasksList} from "../actions/journal";
import "../server_files/sockets/journal"
import {socket} from "../server_files/sockets/socket_client";
import JournalGroup from "../components/account/journal_group/journal_group";
import {
    DEFAULT_PAGES_BACKGROUND_COLOR,
    EMPLOYEE_USER_STATUS
} from "../constants";

export default function Account(){
    const userStatus = useSelector(state => state.user.currentUser.status)
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [showJournal, setShowJournal] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        const waitFunc = async () => {
            if (userStatus === EMPLOYEE_USER_STATUS)
                await dispatch(getGroups())
            await dispatch(getTasksList())
            await socket.init('journal', {})
        }
        waitFunc()
    }, [dispatch, userStatus]);

    return (
        <div style={{backgroundColor: DEFAULT_PAGES_BACKGROUND_COLOR}}>
            <DefaultHeader/>
            <AccountAround
                setShowTaskForm={setShowTaskForm}
                setShowJournal={setShowJournal}
            />
            {userStatus === EMPLOYEE_USER_STATUS &&
                <React.Fragment>
                    <TaskForm show={showTaskForm} setShow={setShowTaskForm}/>
                    <JournalGroup show={showJournal} setShow={setShowJournal}/>
                </React.Fragment>
            }
        </div>
    )
}
