import {configureStore} from '@reduxjs/toolkit'
import modalReducer from "./modalSlice"
import loggedReducer from './loggedSlicer'
import userReducer from './userSlicer'
import credentialsReducer from './credentialsSlicer'

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        logged: loggedReducer,
        user: userReducer,
        credentials: credentialsReducer
    }
}) 