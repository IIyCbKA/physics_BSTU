import {socket} from "./socket_client";
import {deleteTask, updateTask, addTask, addWork, deleteWork, updateGradeStudent} from "../../reducers/journal_reducer";
import {store} from "../../reducers";
import { updateGradeEmployee } from "../../reducers/selected_group_reducer";

socket.onMessage('deleteTask', (taskID) => {
    store.dispatch(deleteTask(taskID))
})

socket.onMessage('updateTask', (task) => {
    store.dispatch(updateTask(task))
})

socket.onMessage('addTask', (task) => {
    store.dispatch(addTask(task))
})

socket.onMessage('addWork', (work) => {
    store.dispatch(addWork(work))
})

socket.onMessage('deleteWork', (work) => {
    store.dispatch(deleteWork(work))
})

socket.onMessage('updateGrade', (gradeInfo) => {
    const status = store.getState().user.currentUser.status
    console.log(status)
    if (status === 'student')
        store.dispatch(updateGradeStudent(gradeInfo))
})

socket.onMessage('updateGradeEmployee', (gradeInfo) => {
    const sg = store.getState().selectedGroup
    if ( sg.groupID === gradeInfo.group_id)
        store.dispatch(updateGradeEmployee(gradeInfo))
})
