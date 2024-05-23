import {socket} from "./socket_client";
import {deleteTask, updateTask, addTask, addWork, deleteWork, updateGrade} from "../../reducers/journal_reducer";
import {store} from "../../reducers";

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
    store.dispatch(updateGrade(gradeInfo))
})
