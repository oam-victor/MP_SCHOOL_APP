import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
    uid: string | null;
    name: string | null;
    email: string | null;
    photoURL: string | null;
    permission: string | null;
}

const initialState: InitialState = {
  uid: localStorage.getItem('uid') ? localStorage.getItem('uid') : null,
  name: localStorage.getItem('name') ? localStorage.getItem('name') : null,
  email:  localStorage.getItem('email') ? localStorage.getItem('email') : null,
  photoURL:  localStorage.getItem('photoURL') ? localStorage.getItem('photoURL') : null,
  permission:  localStorage.getItem('permission') ? localStorage.getItem('permission') : null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<InitialState>) => {
      state.uid = action.payload?.uid
      state.name = action.payload?.name
      state.email = action.payload?.email
      state.photoURL = action.payload?.photoURL
      state.permission = action.payload?.permission
      localStorage.setItem('uid', String(state.uid));
      localStorage.setItem('name', String(state.name));
      localStorage.setItem('email', String(state.email));
      localStorage.setItem('photoURL', String(state.photoURL));
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer