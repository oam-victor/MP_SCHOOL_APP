import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
    uid: string | null;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

const initialState: InitialState = {
  uid: localStorage.getItem('uid') ? localStorage.getItem('uid') : null,
  displayName: localStorage.getItem('displayName') ? localStorage.getItem('displayName') : null,
  email:  localStorage.getItem('email') ? localStorage.getItem('email') : null,
  photoURL:  localStorage.getItem('photoURL') ? localStorage.getItem('photoURL') : null,
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
      localStorage.setItem('uid', String(state.uid));
      localStorage.setItem('displayName', String(state.displayName));
      localStorage.setItem('email', String(state.email));
      localStorage.setItem('photoURL', String(state.photoURL));
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer