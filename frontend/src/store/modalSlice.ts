import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  modalStudent: boolean
  modalStudentAdd: boolean
  modalStudentDelete: boolean
  modalEmployee: boolean
  modalEmployeeAdd: boolean
  modalEmployeeDelete: boolean
  modalClasses: boolean
  modalClassesAdd: boolean
  modalClassesDelete: boolean
  modalFinancial: boolean
  modalFinancialAdd: boolean
  modalFinancialDelete: boolean
}

const initialState: InitialState = {
  modalStudent: false,
  modalStudentAdd: false,
  modalStudentDelete: false,
  modalEmployee: false,
  modalEmployeeAdd: false,
  modalEmployeeDelete: false,
  modalClasses: false,
  modalClassesAdd: false,
  modalClassesDelete: false,
  modalFinancial: false,
  modalFinancialAdd: false,
  modalFinancialDelete: false,
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
    toggleModalEmployeeAdd: (state:InitialState) => {
      state.modalEmployeeAdd = !state.modalEmployeeAdd
    },
    toggleModalEmployeeDelete: (state:InitialState) => {
      state.modalEmployeeDelete = !state.modalEmployeeDelete
    },
    toggleModalClasses: (state:InitialState) => {
      state.modalClasses = !state.modalClasses
    },
    toggleModalClassesAdd: (state:InitialState) => {
      state.modalClassesAdd = !state.modalClassesAdd
    },
    toggleModalClassesDelete: (state:InitialState) => {
      state.modalClassesDelete = !state.modalClassesDelete
    },
    toggleModalFinancial: (state:InitialState) => {
      state.modalFinancial = !state.modalFinancial
    },
    toggleModalFinancialAdd: (state:InitialState) => {
      state.modalFinancialAdd = !state.modalFinancialAdd
    },
    toggleModalFinancialDelete: (state:InitialState) => {
      state.modalFinancialDelete = !state.modalFinancialDelete
    },
  },
})

export const {toggleModalStudent} = modalSlice.actions
export const {toggleModalStudentAdd} = modalSlice.actions
export const {toggleModalStudentDelete} = modalSlice.actions
export const {toggleModalFinancial} = modalSlice.actions
export const {toggleModalFinancialAdd} = modalSlice.actions
export const {toggleModalFinancialDelete} = modalSlice.actions
export const {toggleModalClasses} = modalSlice.actions
export const {toggleModalClassesAdd} = modalSlice.actions
export const {toggleModalClassesDelete} = modalSlice.actions
export const {toggleModalEmployee} = modalSlice.actions
export const {toggleModalEmployeeAdd} = modalSlice.actions
export const {toggleModalEmployeeDelete} = modalSlice.actions

export default modalSlice.reducer