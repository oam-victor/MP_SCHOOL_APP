import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ObjectId } from 'mongoose'
import { EmployeeModal } from './Employee/EmployeeModal'
import { EmployeeModalAdd } from './Employee/EmployeeModalAdd'
import { EmployeeModalDelete } from './Employee/EmployeeModalDelete'
import { toggleModalEmployee } from '../store/modalSlice'
import { toggleModalEmployeeAdd } from '../store/modalSlice'
import { toggleModalEmployeeDelete } from '../store/modalSlice'
import { MagnifyingGlass } from '@phosphor-icons/react'

interface Data {
  _id: ObjectId
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

export const Employees = () => {
  const [data, setData] = useState<Data[] | null>(null)
  const [select, setSelect] = useState<Data | null>(null)
  const [searchFlag, setSearchFlag] = useState<boolean>(false)
  const [matchingElement, setMatchingElement] = useState<Data[]>([])
  const dispatch = useDispatch()

  const modalAdd: boolean = useSelector(
    (state: RootState) => state.modal.modalEmployeeAdd,
  )

  const modalDelete: boolean = useSelector(
    (state: RootState) => state.modal.modalEmployeeDelete,
  )

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = axios.get('http://localhost:3000/api/employees')
      const responseData = (await response).data
      setData(responseData || [])
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="delay-300 mx-auto w-3/4">
      {select && <EmployeeModal employee={select} />}
      {modalAdd && <EmployeeModalAdd />}
      {modalDelete && select && <EmployeeModalDelete id_={select?._id} />}
      {data ? (
        <div className="w-full p-5">
          <div className="px-4 sm:px-0">
            <h3 className="inline-block text-xl text-cyan-900 font-semibold leading-7">
              Employees
            </h3>
            <button
              type="button"
              onClick={() => {
                dispatch(toggleModalEmployeeAdd())
              }}
              className="ml-2 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
            >
              Add
            </button>

            <div className="mt-2 flex">
              {' '}
              <input
                placeholder="search employee"
                className="w-full rounded-md"
                type="text"
                onChange={(e) => {
                  const currentSearch = e.target.value
                  const matchElements = []
                  if (currentSearch) {
                    for (const employee of data) {
                        if (
                          employee.name &&
                          employee.name
                            .toLowerCase()
                            .includes(currentSearch.toLowerCase()) &&
                          matchElements.length < 5
                        ) {
                          matchElements.push(employee)
                          setMatchingElement(matchElements)
                        }
                        if (matchingElement.length > 2) {
                          break
                        }
                    }
                  } else {
                    setMatchingElement([])
                  }
                }}
              />
              <button
                type="button"
                className="ml-2 text-indigo-600 hover:opacity-50"
                onClick={() => {
                  setSearchFlag(!searchFlag)
                }}
              >
                {' '}
                <MagnifyingGlass />{' '}
              </button>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {!matchingElement.length
                ? data.map((employee) => {
                    return (
                      <div
                        onMouseDown={(e) => e.preventDefault()}
                        key={String(employee._id)}
                        className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 "
                      >
                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                          {employee.name}
                        </dt>
                        <dd className="mb-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                          {employee.email}
                        </dd>
                        <dd className="flex justify-start text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                          <button
                            type="button"
                            onClick={() => {
                              setSelect(employee)
                              dispatch(toggleModalEmployeeDelete())
                            }}
                            className="h-8 mr-2 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelect(employee)
                              dispatch(toggleModalEmployee())
                            }}
                            className="h-8 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                          >
                            Edit
                          </button>
                        </dd>
                      </div>
                    )
                  })
                : matchingElement.map((employee) => {
                    return (
                      <div
                        onMouseDown={(e) => e.preventDefault()}
                        key={String(employee._id)}
                        className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 "
                      >
                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                          {employee.name}
                        </dt>
                        <dd className="mb-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                          {employee.email}
                        </dd>
                        <dd className="flex justify-start text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                          <button
                            type="button"
                            onClick={() => {
                              setSelect(employee)
                              dispatch(toggleModalEmployeeDelete())
                            }}
                            className="h-8 mr-2 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelect(employee)
                              dispatch(toggleModalEmployee())
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
