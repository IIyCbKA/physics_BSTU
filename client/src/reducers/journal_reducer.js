const SET_GROUPS = "SET_GROUPS"
const SET_TASKS = "SET_TASKS"
const SET_ACTIVE_TASK = "SET_ACTIVE_TASK"

const defaultState = {
    groups: [],
    tasks: [],
    activeTask: {}
}

export default function journalReducer(state = defaultState, action){
    switch (action.type) {
        case SET_GROUPS: return {...state, groups: action.payload}
        case SET_TASKS: return {...state, tasks: action.payload}
        case SET_ACTIVE_TASK: return {...state, activeTask: action.payload}
        default:
            return state
    }
}

export const setGroups = groups => ({type: SET_GROUPS, payload: groups})
export const setTasks = tasks => ({type: SET_TASKS, payload: tasks})
export const setActiveTask = activeTasks => ({type: SET_ACTIVE_TASK, payload: activeTasks})
