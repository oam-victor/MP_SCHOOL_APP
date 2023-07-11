import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
    uid: string | null;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

const initialState: InitialState = {
  uid: null,
  displayName: null,
  email:  null,
  photoURL:  null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<InitialState>) => {
      state.uid = action.payload?.uid
      state.displayName = action.payload?.displayName
      state.email = action.payload?.email
      state.photoURL = action.payload?.photoURL
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
