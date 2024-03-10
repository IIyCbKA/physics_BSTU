import {
    configureStore,
    combineReducers,
} from '@reduxjs/toolkit';
import userReducer from "./user_reducer";
import fileReducer from "./file_reducer";
import {thunk} from "redux-thunk";


const rootReducer = combineReducers({
    user: userReducer,
    file: fileReducer,
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})
