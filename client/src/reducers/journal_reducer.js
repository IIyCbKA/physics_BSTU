const SET_GROUPS = "SET_GROUPS"
const SET_TASKS = "SET_TASKS"
const SET_UPDATE_TASK = "SET_UPDATE_TASK"
const ADD_TASK = "ADD_TASK"
const DELETE_TASK = "DELETE_TASK"
const UPDATE_TASK = "UPDATE_TASK"

const defaultState = {
    groups: [],
    tasks: [],
    updatingTask: {}
}

export default function journalReducer(state = defaultState, action){
    switch (action.type) {
        case SET_GROUPS: return {...state, groups: action.payload}
        case SET_TASKS: return {...state, tasks: action.payload}
        case SET_UPDATE_TASK: return {...state, updatingTask: action.payload}
        case ADD_TASK: return {...state, tasks: [...state.tasks, action.payload]}
        case DELETE_TASK: return {...state,
            tasks: state.tasks.filter(task => task.id !== action.payload)}
        case UPDATE_TASK: return {...state,
            tasks: state.tasks.map(task => task.id === action.payload.id ?
                action.payload : task)}
        default:
            return state
    }
}

export const setGroups = groups => ({type: SET_GROUPS, payload: groups})
export const setTasks = tasks => ({type: SET_TASKS, payload: tasks})
export const setUpdatingTask = task => ({type: SET_UPDATE_TASK, payload: task})
export const addTask = task => ({type: ADD_TASK, payload: task})
export const deleteTask = taskID => ({type: DELETE_TASK, payload: taskID})
export const updateTask = task => ({type: UPDATE_TASK, payload: task})
