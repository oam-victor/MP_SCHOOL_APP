import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
    isLogged: boolean
  }
  
  const initialState: InitialState = {
    isLogged: localStorage.getItem('isLogged') === 'true' || false,
  }

const loggedSlice = createSlice({
    name: "logged",
    initialState,
    reducers: {
        toggleIsLogged: (state:InitialState) => {
          const updatedIsLogged = !state.isLogged;
          state.isLogged = updatedIsLogged;
          localStorage.setItem('isLogged', String(updatedIsLogged));
          }
    }
})

export const {toggleIsLogged} = loggedSlice.actions
export default loggedSlice.reducer