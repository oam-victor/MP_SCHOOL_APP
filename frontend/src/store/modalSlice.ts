import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  modalStudent: boolean
  modalStudentAdd: boolean
  modalStudentDelete: boolean
  modalUser: boolean
  modalUserAdd: boolean
  modalUserDelete: boolean
  modalEmployee: boolean
  modalEmployeeAdd: boolean
  modalEmployeeDelete: boolean
  modalClass_: boolean
  modalClass_Add: boolean
  modalClass_Delete: boolean
  modalFinancial: boolean
  modalFinancialAdd: boolean
  modalFinancialDelete: boolean
  modalExpense: boolean
  modalExpenseAdd: boolean
  modalExpenseDelete: boolean
  modalSignUp: boolean
}

const initialState: InitialState = {
  modalStudent: false,
  modalStudentAdd: false,
  modalStudentDelete: false,
  modalUser: false,
  modalUserAdd: false,
  modalUserDelete: false,
  modalEmployee: false,
  modalEmployeeAdd: false,
  modalEmployeeDelete: false,
  modalClass_: false,
  modalClass_Add: false,
  modalClass_Delete: false,
  modalFinancial: false,
  modalFinancialAdd: false,
  modalFinancialDelete: false,
  modalExpense: false,
  modalExpenseAdd: false,
  modalExpenseDelete: false,
  modalSignUp: false
}

const modalSlice = createSlice({
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
    toggleModalUser: (state:InitialState) => {
      state.modalUser = !state.modalUser
      //state = [...state, action.payload]
    },
    toggleModalUserAdd: (state:InitialState) => {
      state.modalUserAdd = !state.modalUserAdd
      //state = [...state, action.payload]
    },
    
    toggleModalUserDelete: (state:InitialState) => {
      state.modalUserDelete = !state.modalUserDelete
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
    toggleModalClass_: (state:InitialState) => {
      state.modalClass_ = !state.modalClass_
    },
    toggleModalClass_Add: (state:InitialState) => {
      state.modalClass_Add = !state.modalClass_Add
    },
    toggleModalClass_Delete: (state:InitialState) => {
      state.modalClass_Delete = !state.modalClass_Delete
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
    toggleModalExpense: (state:InitialState) => {
      state.modalExpense = !state.modalExpense
    },
    toggleModalExpenseAdd: (state:InitialState) => {
      state.modalExpenseAdd = !state.modalExpenseAdd
    },
    toggleModalExpenseDelete: (state:InitialState) => {
      state.modalExpenseDelete = !state.modalExpenseDelete
    },
    toggleModalSignUp: (state:InitialState) => {
      state.modalSignUp = !state.modalSignUp
    }
  },
})

export const {toggleModalStudent} = modalSlice.actions
export const {toggleModalStudentAdd} = modalSlice.actions
export const {toggleModalStudentDelete} = modalSlice.actions
export const {toggleModalUser} = modalSlice.actions
export const {toggleModalUserAdd} = modalSlice.actions
export const {toggleModalUserDelete} = modalSlice.actions
export const {toggleModalFinancial} = modalSlice.actions
export const {toggleModalFinancialAdd} = modalSlice.actions
export const {toggleModalFinancialDelete} = modalSlice.actions
export const {toggleModalExpense} = modalSlice.actions
export const {toggleModalExpenseAdd} = modalSlice.actions
export const {toggleModalExpenseDelete} = modalSlice.actions
export const {toggleModalClass_} = modalSlice.actions
export const {toggleModalClass_Add} = modalSlice.actions
export const {toggleModalClass_Delete} = modalSlice.actions
export const {toggleModalEmployee} = modalSlice.actions
export const {toggleModalEmployeeAdd} = modalSlice.actions
export const {toggleModalEmployeeDelete} = modalSlice.actions
export const {toggleModalSignUp} = modalSlice.actions

export default modalSlice.reducer