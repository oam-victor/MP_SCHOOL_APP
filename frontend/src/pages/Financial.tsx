import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ObjectId } from 'mongoose'
import { FinancialModal } from './Financial/FinancialModal'
import { ExpenseModal } from './Financial/ExpenseModal'
import { FinancialModalAdd } from './Financial/FinancialModalAdd'
import { ExpenseModalAdd } from './Financial/ExpenseModalAdd'
import { FinancialModalDelete } from './Financial/FinancialModalDelete'
import { ExpenseModalDelete } from './Financial/ExpenseModalDelete'
import { useDispatch } from 'react-redux'
import { toggleModalFinancial } from '../store/modalSlice'
import { toggleModalFinancialAdd } from '../store/modalSlice'
import { toggleModalFinancialDelete } from '../store/modalSlice'
import { toggleModalExpense } from '../store/modalSlice'
import { toggleModalExpenseAdd } from '../store/modalSlice'
import { toggleModalExpenseDelete } from '../store/modalSlice'
import { MagnifyingGlass } from '@phosphor-icons/react'

interface Data {
  _id: ObjectId
  name: string
  type: string
  cost: number
  paid_on: Date
}

interface RootState {
  modal: {
    modalFinancial: boolean
    modalFinancialAdd: boolean
    modalFinancialDelete: boolean
    modalExpense: boolean
    modalExpenseAdd: boolean
    modalExpenseDelete: boolean
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Financial = () => {
  const [income, setIncome] = useState<Data[] | null>(null)
  const [expense, setExpense] = useState<Data[] | null>(null)
  const [select, setSelect] = useState<Data | null>(null)
  const [selectExpense, setSelectExpense] = useState<Data | null>(null)
  const [searchFlag1, setSearchFlag1] = useState<boolean>(false)
  const [searchFlag2, setSearchFlag2] = useState<boolean>(false)
  const [matchingElement1, setMatchingElement1] = useState<Data[]>([])
  const [matchingElement2, setMatchingElement2] = useState<Data[]>([])
  const dispatch = useDispatch()

  const modalAdd: boolean = useSelector(
    (state: RootState) => state.modal.modalFinancialAdd,
  )

  const modalAddExpense: boolean = useSelector(
    (state: RootState) => state.modal.modalExpenseAdd,
  )

  const modalDelete: boolean = useSelector(
    (state: RootState) => state.modal.modalFinancialDelete,
  )

  const modalDeleteExpense: boolean = useSelector(
    (state: RootState) => state.modal.modalExpenseDelete,
  )

  const fetchData = async () => {
    try {
      const response = axios.get('http://52.14.220.72:3000/api/income')
      const responseData = (await response).data
      setIncome(responseData || [])
    } catch (err) {
      console.log(err)
    }
  }

  const fetchExpense = async () => {
    try {
      const response = axios.get('http://52.14.220.72:3000/api/expense')
      const responseData = (await response).data
      setExpense(responseData || [])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchExpense()
  }, [])

  return (
    <div>
      <div className="delay-300 mx-auto w-3/4">
        {select && <FinancialModal income={select} />}
        {modalAdd && <FinancialModalAdd />}
        {modalDelete && select && <FinancialModalDelete id_={select?._id} />}
        {income ? (
          <div className="w-full p-5">
            <div className="px-4 sm:px-0">
              <h3 className="inline-block text-xl text-green-700 font-semibold leading-7">
                Income
              </h3>
              <button
                type="button"
                onClick={() => {
                  dispatch(toggleModalFinancialAdd())
                }}
                className="ml-2 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
              >
                Add
              </button>

              <div className="mt-2 flex">
                {' '}
                <input
                  placeholder="search income"
                  className="w-full rounded-md"
                  type="text"
                  onChange={(e) => {
                    const currentSearch = e.target.value
                    const matchElements = []
                    if (currentSearch) {
                      for (const element of income) {
                        if (
                          element.name &&
                          element.name
                            .toLowerCase()
                            .includes(currentSearch.toLowerCase()) &&
                          matchElements.length < 5
                        ) {
                          matchElements.push(element)
                          setMatchingElement1(matchElements)
                        }
                        if (matchingElement1.length > 2) {
                          break
                        }
                      }
                    } else {
                      setMatchingElement1([])
                    }
                  }}
                />
                <button
                  type="button"
                  className="ml-2 text-indigo-600 hover:opacity-50"
                  onClick={() => {
                    setSearchFlag1(!searchFlag1)
                  }}
                >
                  {' '}
                  <MagnifyingGlass />{' '}
                </button>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {!matchingElement1.length
                  ? income.map((income) => {
                      return (
                        <div
                          onMouseDown={(e) => e.preventDefault()}
                          key={String(income._id)}
                          className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 "
                        >
                          <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                            {income.name}
                          </dt>
                          <dd className="mb-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                            {income.cost.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </dd>
                          <dd className="flex justify-start text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                            <button
                              type="button"
                              onClick={() => {
                                setSelect(income)
                                dispatch(toggleModalFinancialDelete())
                              }}
                              className="h-8 mr-2 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelect(income)
                                dispatch(toggleModalFinancial())
                              }}
                              className="h-8 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                            >
                              Edit
                            </button>
                          </dd>
                        </div>
                      )
                    })
                  : matchingElement1.map((income) => {
                      return (
                        <div
                          onMouseDown={(e) => e.preventDefault()}
                          key={String(income._id)}
                          className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 "
                        >
                          <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                            {income.name}
                          </dt>
                          <dd className="mb-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                            {income.cost.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </dd>
                          <dd className="flex justify-start text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                            <button
                              type="button"
                              onClick={() => {
                                setSelect(income)
                                dispatch(toggleModalFinancialDelete())
                              }}
                              className="h-8 mr-2 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelect(income)
                                dispatch(toggleModalFinancial())
                              }}
                              className="h-8 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                            >
                              Edit
                            </button>
                          </dd>
                        </div>
                      )
                    })}
              </dl>
            </div>
          </div>
        ) : (
          <div className="text-8xl flex  justify-center items-center">
            <span className="animate-ping">.</span>
            <span className="animate-ping">.</span>
            <span className="animate-ping">.</span>
            <span className="animate-ping">.</span>
            <span className="animate-ping">.</span>
          </div>
        )}
      </div>

      <div className="delay-300 mx-auto w-3/4">
        {selectExpense && <ExpenseModal expense={selectExpense} />}
        {modalAddExpense && <ExpenseModalAdd />}
        {modalDeleteExpense && selectExpense && (
          <ExpenseModalDelete id_={selectExpense?._id} />
        )}

        {expense ? (
          <div className="w-full p-5">
            <div className="px-4 sm:px-0">
              <h3 className="inline-block text-xl text-red-700 font-semibold leading-7">
                Expense
              </h3>
              <button
                type="button"
                onClick={() => {
                  dispatch(toggleModalExpenseAdd())
                }}
                className="ml-2 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
              >
                Add
              </button>

              <div className="mt-2 flex">
                {' '}
                <input
                  placeholder="search expense"
                  className="w-full rounded-md"
                  type="text"
                  onChange={(e) => {
                    const currentSearch = e.target.value
                    const matchElements = []
                    if (currentSearch) {
                      for (const element of expense) {
                        if (
                          element.name &&
                          element.name
                            .toLowerCase()
                            .includes(currentSearch.toLowerCase()) &&
                          matchElements.length < 5
                        ) {
                          matchElements.push(element)
                          setMatchingElement2(matchElements)
                        }
                        if (matchingElement2.length > 2) {
                          break
                        }
                      }
                    } else {
                      setMatchingElement2([])
                    }
                  }}
                />
                <button
                  type="button"
                  className="ml-2 text-indigo-600 hover:opacity-50"
                  onClick={() => {
                    setSearchFlag2(!searchFlag2)
                  }}
                >
                  {' '}
                  <MagnifyingGlass />{' '}
                </button>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {!matchingElement2.length
                  ? expense.map((expense) => {
                      return (
                        <div
                          onMouseDown={(e) => e.preventDefault()}
                          key={String(expense._id)}
                          className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 "
                        >
                          <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                            {expense.name}
                          </dt>
                          <dd className="mb-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                            {expense.cost.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </dd>
                          <dd className="flex justify-start text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectExpense(expense)
                                dispatch(toggleModalExpenseDelete())
                              }}
                              className="h-8 mr-2 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectExpense(expense)
                                dispatch(toggleModalExpense())
                              }}
                              className="h-8 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                            >
                              Edit
                            </button>
                          </dd>
                        </div>
                      )
                    })
                  : matchingElement2.map((expense) => {
                      return (
                        <div
                          onMouseDown={(e) => e.preventDefault()}
                          key={String(expense._id)}
                          className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 "
                        >
                          <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                            {expense.name}
                          </dt>
                          <dd className="mb-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                            {expense.cost.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </dd>
                          <dd className="flex justify-start text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectExpense(expense)
                                dispatch(toggleModalExpenseDelete())
                              }}
                              className="h-8 mr-2 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectExpense(expense)
                                dispatch(toggleModalExpense())
                              }}
                              className="h-8 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                            >
                              Edit
                            </button>
                          </dd>
                        </div>
                      )
                    })}
              </dl>
            </div>
          </div>
        ) : (
          <div className="text-8xl flex  justify-center items-center">
            <span className="animate-ping">.</span>
            <span className="animate-ping">.</span>
            <span className="animate-ping">.</span>
            <span className="animate-ping">.</span>
            <span className="animate-ping">.</span>
          </div>
        )}
      </div>
    </div>
  )
}
