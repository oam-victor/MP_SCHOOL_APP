import type { Dispatch } from 'redux'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModalFinancial } from '../store/modalSlice'
import { ObjectId } from 'mongoose'
import axios from 'axios'

interface Data {
  _id: ObjectId
  name: string
  type: string
  cost: number
  paid_on: Date
}

interface FinancialModalProps {
  income: Data | null
}

interface RootState {
  modal: {
    modalFinancial: boolean
    modalFinancialAdd: boolean
    modalFinancialDelete: boolean
  }
}

export const FinancialModal = ({ income }: FinancialModalProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [incomeId, setIncomeId] = useState<any>(income?._id)
  const [incomeName, setIncomeName] = useState<string>(income?.name || '')
  const [incomeType, setIncomeType] = useState<string>(income?.type || '')
  const [incomeCost, setIncomeCost] = useState<number>(income?.cost || 0)
  const [incomePaidOn, setIncomePaidOn] = useState<Date>(
    income?.paid_on || new Date(1900, 1, 1),
  )

  useEffect(() => {
    setIncomeId(income?._id)
    setIncomeName(income?.name || '')
    setIncomeType(income?.type || '')
    setIncomeCost(income?.cost || 0)
    setIncomePaidOn(income?.paid_on || new Date(1900, 1, 1))
  }, [income])

  const modal: boolean = useSelector(
    (state: RootState) => state.modal.modalFinancial,
  )
  const dispatch: Dispatch = useDispatch()
  const cancelButtonRef = useRef(null)

  const handleSubmit = async () => {
    try {
      const formData: Data = {
        _id: incomeId,
        name: incomeName,
        type: incomeType,
        cost: incomeCost,
        paid_on: incomePaidOn,
      }
      const response = await axios.put(
        `http://localhost:3000/api/income/${incomeId}`,
        formData,
      )
      console.log(response.status)
    } catch (err) {
      console.log(err)
    }
  }

  if (!income) {
    return <div>No income selected</div>
  } else {
    return (
      <div>
        <Transition.Root show={modal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-1"
            initialFocus={cancelButtonRef}
            onClose={() => {
              dispatch(toggleModalFinancial())
            }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <form
                      onSubmit={() => {
                        handleSubmit()
                      }}
                      className="p-5 z-2"
                    >
                      <div className="space-y-12">
                        <div>
                          <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Income Information
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Update Income
                          </p>
                        </div>

                        <div className="">
                          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                              </label>
                              <div className="mt-2">
                                <input
                                  required
                                  type="text"
                                  name="first-name"
                                  id="first-name"
                                  value={incomeName}
                                  onChange={(e) => {
                                    setIncomeName(e.target.value)
                                  }}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Type
                              </label>
                              <div className="mt-2">
                                <select
                                  name="type"
                                  id="type"
                                  value={incomeType}
                                  onChange={(e) => {
                                    setIncomeType(e.target.value)
                                  }}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option>One-Time</option>
                                  <option>Recurring</option>
                                </select>
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Cost
                              </label>
                              <div className="mt-2">
                                <input
                                  type="number"
                                  name="cost"
                                  id="cost"
                                  value={String(incomeCost)}
                                  onChange={(e) => {
                                    setIncomeCost(Number(e.target.value))
                                  }}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Paid On
                              </label>
                              <div className="mt-2">
                                <input
                                  type="date"
                                  name="date"
                                  id="date"
                                  value={`${new Date(
                                    incomePaidOn,
                                  ).getFullYear()}-${
                                    new Date(incomePaidOn).getMonth() > 9
                                      ? new Date(incomePaidOn).getMonth()
                                      : `0${new Date(incomePaidOn).getMonth()}`
                                  }-${
                                    new Date(incomePaidOn).getDate() > 9
                                      ? new Date(incomePaidOn).getDate()
                                      : `0${new Date(incomePaidOn).getDate()}`
                                  }`}
                                  onChange={(e) => {
                                    const inputDate = e.target.value
                                    const parts = inputDate.split('-')

                                    const yearAux = parts[0]
                                    const monthAux = parts[1]
                                    const dayAux = parts[2]

                                    setIncomePaidOn(
                                      new Date(
                                        Number(yearAux),
                                        Number(monthAux),
                                        Number(dayAux),
                                      ),
                                    )
                                  }}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="button"
                          className="text-sm font-semibold leading-6 text-gray-900"
                          onClick={() => {
                            dispatch(toggleModalFinancial())
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    )
  }
}