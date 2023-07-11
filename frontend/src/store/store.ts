import {configureStore} from '@reduxjs/toolkit'
import modalReducer from "./modalSlice"
import loggedReducer from './loggedSlicer'
import userReducer from './userSlicer'

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        logged: loggedReducer,
        user: userReducer
    }
}) 