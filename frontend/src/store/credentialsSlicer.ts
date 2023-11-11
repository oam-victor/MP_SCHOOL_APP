//==============================Check Invalid Credentials==================================//
import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
    flag: boolean;
}

const initialState: InitialState = {
  flag: false
}

const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    toggleCredentials: (state:InitialState) => {
      state.flag = !state.flag
      //state = [...state, action.payload]
    },
  },
})


export const {toggleCredentials} = credentialsSlice.actions

export default credentialsSlice.reducer