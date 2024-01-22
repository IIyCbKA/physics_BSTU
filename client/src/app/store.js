import {configureStore} from "@reduxjs/toolkit";
import counterReducer from '../feathures/counter/counterSlice'


export const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
});