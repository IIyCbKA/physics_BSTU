const SET_SELECTED_GROUP = "SET_SELECTED_GROUP"
const FREE_SELECTED_GROUP = "FREE_SELECTED_GROUP"

const defaultState = {
    students: [],
    groupID: null,
    groupName: null
}

export default function selectedGroupReducer(state = defaultState, action){
    switch (action.type) {
        case SET_SELECTED_GROUP: return {
            ...state, students: action.payload.students,
            groupID: action.payload.groupID, groupName: action.payload.groupName
        }
        case FREE_SELECTED_GROUP: return {
            ...state, students: [],
            groupID: null, groupName: null
        }
        default:
            return state
    }
}

export const setSelectedGroup = groupInfo => ({type: SET_SELECTED_GROUP, payload: groupInfo})
export const freeSelectedGroup = () => ({type: FREE_SELECTED_GROUP, payload: null})
