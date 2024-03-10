import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./user_reducer";
import fileReducer from "./file_reducer";


function loggerMiddleware(store){
    return function (next){
        return function (action){
            console.log(store, next, action)
        }
    }
}


const rootReducer = {
    user: userReducer,
    file: fileReducer
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware)
})
