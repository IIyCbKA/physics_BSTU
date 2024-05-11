import {socket} from "./socket_client";
import {deleteTask, updateTask, addTask} from "../../reducers/journal_reducer";
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
