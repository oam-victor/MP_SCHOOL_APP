import {configureStore} from '@reduxjs/toolkit'
import modalReducer from "./modalSlice"
import loggedReducer from './loggedSlicer'

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        logged: loggedReducer
    }
}) 