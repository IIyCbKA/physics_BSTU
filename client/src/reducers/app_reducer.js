const SET_ORIENTATION = "SET_ORIENTATION"

const defaultState = {
    orientation: ""
}

export default function AppReducer(state = defaultState, action){
    switch (action.type) {
        case SET_ORIENTATION: return {...state, orientation: action.payload}
        default:
            return state
    }
}

export const setOrientation = orientation => ({type: SET_ORIENTATION, payload: orientation})
