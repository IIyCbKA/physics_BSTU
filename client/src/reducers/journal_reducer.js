const SET_GROUPS = "SET_GROUPS"
const SET_TASKS = "SET_TASKS"
const SET_ACTIVE_TASKS = "SET_ACTIVE_TASKS"
const ADD_ACTIVE_TASK = "ADD_ACTIVE_TASK"
const DELETE_ACTIVE_TASK = "DELETE_ACTIVE_TASK"

const defaultState = {
    groups: [],
    tasks: [],
    activeTasks: []
}

export default function journalReducer(state = defaultState, action){
    switch (action.type) {
        case SET_GROUPS: return {...state, groups: action.payload}
        case SET_TASKS: return {...state, tasks: action.payload}
        case SET_ACTIVE_TASKS: return {...state, activeTasks: action.payload}
        case ADD_ACTIVE_TASK: return {...state, activeTasks: [...state.activeTasks, action.payload]}
        case DELETE_ACTIVE_TASK: return {...state, activeTasks:
            state.activeTasks.filter(task => task.id !== action.payload.id)}
        default:
            return state
    }
}

export const setGroups = groups => ({type: SET_GROUPS, payload: groups})
export const setTasks = tasks => ({type: SET_TASKS, payload: tasks})
export const setActiveTasks = activeTasks => ({type: SET_ACTIVE_TASKS, payload: activeTasks})
export const addActiveTask = activeTask => ({type: ADD_ACTIVE_TASK, payload: activeTask})
export const deleteActiveTask = activeTask => ({type: DELETE_ACTIVE_TASK, payload: activeTask})
