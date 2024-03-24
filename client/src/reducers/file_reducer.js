const SET_FILES = "SET_FILES"
const SET_PATH = "SET_PATH"

const defaultState = {
    files: [],
    path: '/'
}

export default function fileReducer(state = defaultState, action){
    switch (action.type) {
        case SET_FILES: return {...state, files: action.payload}
        case SET_PATH: return {...state, path: action.payload}
        default:
            return state
    }
}

export const setFiles = files => ({type: SET_FILES, payload: files})
export const setPath = path => ({type: SET_PATH, payload: path})
