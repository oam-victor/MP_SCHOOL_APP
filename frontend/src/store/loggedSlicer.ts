import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
    isLogged: boolean
  }
  
  const initialState: InitialState = {
    isLogged: false
  }

const loggedSlice = createSlice({
    name: "logged",
    initialState,
    reducers: {
        toggleIsLogged: (state:InitialState) => {
            state.isLogged = !state.isLogged
            //state = [...state, action.payload]
          }
    }
})

export const {toggleIsLogged} = loggedSlice.actions
export default loggedSlice.reducer