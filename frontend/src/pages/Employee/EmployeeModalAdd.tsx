import type { Dispatch } from 'redux'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModalEmployeeAdd } from '../../store/modalSlice'
import axios from 'axios'

interface Data {
  name: string
  email: string
  position: string
  department: string
  salary: number
  manager: string
  phone: number
}

interface RootState {
  modal: {
    modalEmployee: boolean
    modalEmployeeAdd: boolean
    modalEmployeeDelete: boolean
  }
}

let nameFlag = true

export const EmployeeModalAdd = () => {
  const [employeeName, setEmployeeName] = useState<string>('')
  const [employeeEmail, setEmployeeEmail] = useState<string>('')
  const [employeeManager, setEmployeeManager] = useState<string>('')
  const [employeeDepartment, setEmployeeDepartment] = useState<string>('')
  const [employeePosition, setEmployeePosition] = useState<string>('')
  const [employeePhone, setEmployeePhone] = useState<number>(0)
  const [employeeSalary, setEmployeeSalary] = useState<number>(0)

  const modal: boolean = useSelector(
    (state: RootState) => state.modal.modalEmployeeAdd,
  )

  const dispatch: Dispatch = useDispatch()
  const cancelButtonRef = useRef(null)

  const handleSubmit = async () => {
    try {
      const formData: Data = {
        name: employeeName,
        email: employeeEmail,
        manager: employeeManager,
        phone: employeePhone,
        salary: employeeSalary,
        department: employeeDepartment,
        position: employeePosition,
      }
      const response = await axios.post(
        `http://3.148.115.155:3000/api/employees/`,
        formData,
      )
      console.log(response.status)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Transition.Root show={modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-1"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setEmployeeName('')
            setEmployeeEmail('')
            setEmployeeManager('')
            setEmployeeDepartment('')
            setEmployeePosition('')
            setEmployeePhone(0)
            setEmployeeSalary(0)
            dispatch(toggleModalEmployeeAdd())
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
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Add user
                        </p>
                      </div>

                      <div className="">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Name
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                type="text"
                                name="first-name"
                                id="first-name"
                                onChange={(e) => {
                                  setEmployeeName(e.target.value)
                                  // Test regular expression for numbers
                                  const updatedEmployeeName = e.target.value
                                  if (!/\d/.test(updatedEmployeeName)) {
                                    nameFlag = false
                                  } else {
                                    nameFlag = true
                                  }
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {nameFlag && (
                              <div className="text-sm font-thin text-red-400">
                                Name should not have numbers
                              </div>
                            )}
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Position
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="position"
                                id="position"
                                value={employeePosition}
                                onChange={(e) =>
                                  setEmployeePosition(e.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Department
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="department"
                                id="department"
                                value={employeeDepartment}
                                onChange={(e) =>
                                  setEmployeeDepartment(e.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Manager
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="manager"
                                  id="manager"
                                  value={employeeManager}
                                  onChange={(e) =>
                                    setEmployeeManager(e.target.value)
                                  }
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Salary
                              </label>
                              <div className="mt-2">
                                <input
                                  type="number"
                                  name="salary"
                                  id="salary"
                                  value={employeeSalary}
                                  onChange={(e) => {
                                    setEmployeeSalary(Number(e.target.value))
                                  }}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Phone
                              </label>
                              <div className="mt-2">
                                <input
                                  type="number"
                                  name="phone"
                                  id="phone"
                                  value={employeePhone}
                                  onChange={(e) =>
                                    setEmployeePhone(Number(e.target.value))
                                  }
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  name="email"
                                  value={employeeEmail}
                                  onChange={(e) =>
                                    setEmployeeEmail(e.target.value)
                                  }
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
                          dispatch(toggleModalEmployeeAdd())
                        }}
                      >
                        Cancel
                      </button>
                      {nameFlag ? (
                        <button
                          disabled
                          type="submit"
                          className="opacity-30 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save
                        </button>
                      )}
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
