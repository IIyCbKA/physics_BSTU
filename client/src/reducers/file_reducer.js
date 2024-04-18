const SET_FILES = "SET_FILES"
const SET_PATH = "SET_PATH"
const SELECTED_FILE = "SELECTED_FILE"
const CLOSE_SELECTED = "CLOSE_SELECTED"

const defaultState = {
    files: [],
    path: '/',
    selected_id: null,
    selected_name: null,
    selected_type: null
}

export default function fileReducer(state = defaultState, action){
    switch (action.type) {
        case SET_FILES: return {...state, files: action.payload}
        case SET_PATH: return {...state, path: action.payload}
        case SELECTED_FILE: return {...state,
            selected_id: action.payload.id,
            selected_name: action.payload.name,
            selected_type: action.payload.type}
        case CLOSE_SELECTED: return {...state,
            selected_id: null,
            selected_name: null,
            selected_type: null}
        default:
            return state
    }
}

export const setFiles = files => ({type: SET_FILES, payload: files})
export const setPath = path => ({type: SET_PATH, payload: path})
export const selectedFile = (selected_id, selected_name, selected_type) => (
    {type: SELECTED_FILE, payload:
            {id: selected_id, name: selected_name, type: selected_type}})
export const cleanSelectedInfo = () => ({type: CLOSE_SELECTED})
