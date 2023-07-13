import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ObjectId } from 'mongoose'
import { FinancialModal } from '../components/FinancialModal'
import { FinancialModalAdd } from '../components/FinancialModalAdd'
import { FinancialModalDelete } from '../components/FinancialModalDelete'
import { useDispatch } from 'react-redux'
import { toggleModalFinancial } from '../store/modalSlice'
import { toggleModalFinancialAdd } from '../store/modalSlice'
import { toggleModalFinancialDelete } from '../store/modalSlice'

interface Financial {
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
  }
}

export const Financial = () => {
  const [income, setIncome] = useState<Financial[] | null>(null)
  const [expense, setExpense] = useState<Financial[] | null>(null)
  const [select, setSelect] = useState<Financial | null>(null)
  const dispatch = useDispatch()

  const modalAdd: boolean = useSelector(
    (state: RootState) => state.modal.modalFinancialAdd,
  )

  const modalDelete: boolean = useSelector(
    (state: RootState) => state.modal.modalFinancialDelete,
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = axios.get('http://localhost:3000/api/income')
        const responseData = (await response).data
        setIncome(responseData)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="delay-300 mx-auto w-3/4">
      {select && <FinancialModal income={select} />}
      {modalAdd && <FinancialModalAdd />}
      {modalDelete && select && <FinancialModalDelete id_={select?._id} />}
      {income ? (
        <div className="w-full p-5">
          <div className="px-4 sm:px-0">
            <h3 className="text-xl text-green-700 font-semibold leading-7">
              Income
            </h3>
            <button
              type="button"
              onClick={() => {
                dispatch(toggleModalFinancialAdd())
              }}
              className="font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
            >
              Add
            </button>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {income.map((income) => {
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
  )
}
