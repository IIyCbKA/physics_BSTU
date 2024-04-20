const SET_GROUPS = "SET_GROUPS"

const defaultState = {
    groups: []
}

export default function journalReducer(state = defaultState, action){
    switch (action.type) {
        case SET_GROUPS: return {...state, groups: action.payload}
        default:
            return state
    }
}

export const setGroups = groups => ({type: SET_GROUPS, payload: groups})
