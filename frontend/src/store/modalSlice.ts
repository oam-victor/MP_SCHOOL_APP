import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  modalStudent: boolean
  modalStudentAdd: boolean
  modalStudentDelete: boolean
  modalEmployee: boolean
  modalClasses: boolean
  modalFinancial: boolean
}

const initialState: InitialState = {
  modalStudent: false,
  modalStudentAdd: false,
  modalStudentDelete: false,
  modalEmployee: false,
  modalClasses: false,
  modalFinancial: false,
}

const modalSlice:any = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModalStudent: (state:InitialState) => {
      state.modalStudent = !state.modalStudent
      //state = [...state, action.payload]
    },
    toggleModalStudentAdd: (state:InitialState) => {
      state.modalStudentAdd = !state.modalStudentAdd
      //state = [...state, action.payload]
    },
    
    toggleModalStudentDelete: (state:InitialState) => {
      state.modalStudentDelete = !state.modalStudentDelete
      //state = [...state, action.payload]
    },
    toggleModalEmployee: (state:InitialState) => {
      state.modalEmployee = !state.modalEmployee
    },
    toggleModalClasses: (state:InitialState) => {
      state.modalClasses = !state.modalClasses
    },
    toggleModalFinancial: (state:InitialState) => {
      state.modalFinancial = !state.modalFinancial
    },
  },
})

export const {toggleModalStudent} = modalSlice.actions
export const {toggleModalStudentAdd} = modalSlice.actions
export const {toggleModalStudentDelete} = modalSlice.actions
export default modalSlice.reducer