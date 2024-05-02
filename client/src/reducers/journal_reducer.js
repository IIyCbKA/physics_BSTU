const SET_GROUPS = "SET_GROUPS"
const SET_TASKS = "SET_TASKS"
const SET_UPDATE_TASK = "SET_UPDATE_TASK"

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
        default:
            return state
    }
}

export const setGroups = groups => ({type: SET_GROUPS, payload: groups})
export const setTasks = tasks => ({type: SET_TASKS, payload: tasks})
export const setUpdatingTask = task => ({type: SET_UPDATE_TASK, payload: task})
