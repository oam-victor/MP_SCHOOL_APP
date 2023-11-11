import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ObjectId } from 'mongoose'
import { Class_Modal } from './Class/Class_Modal'
import { Class_ModalAdd } from './Class/Class_ModalAdd'
import { Class_ModalDelete } from './Class/Class_ModalDelete'
import { useDispatch } from 'react-redux'
import { toggleModalClass_ } from '../store/modalSlice'
import { toggleModalClass_Add } from '../store/modalSlice'
import { toggleModalClass_Delete } from '../store/modalSlice'
import { MagnifyingGlass } from '@phosphor-icons/react'

interface Data {
  _id: ObjectId
  name: number
  students: ObjectId[]
  teacher: string
}

interface RootState {
  modal: {
    modalClass_: boolean
    modalClass_Add: boolean
    modalClass_Delete: boolean
  }
}

interface User_ {
  user: {
    uid: string
    email: string
    name: string
    photoURL: string
    password?: string
    permission: string
  }
}

export const Class_ = () => {
  const userSlice = useSelector((state: User_) => state.user)
  const [data, setData] = useState<Data[] | null>(null)
  const [select, setSelect] = useState<Data | null>(null)
  const [searchFlag, setSearchFlag] = useState<boolean>(false)
  const [matchingElement, setMatchingElement] = useState<Data | null>(null)
  const dispatch = useDispatch()

  const modalAdd: boolean = useSelector(
    (state: RootState) => state.modal.modalClass_Add,
  )

  const modalDelete: boolean = useSelector(
    (state: RootState) => state.modal.modalClass_Delete,
  )

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = axios.get('http://3.148.115.155:3000/api/class')
      const responseData = (await response).data
      setData(responseData || [])
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="delay-300 mx-auto w-3/4">
      {select && <Class_Modal class_={select} />}
      {modalAdd && <Class_ModalAdd />}
      {modalDelete && select && <Class_ModalDelete id_={select?._id} />}
      {data ? (
        <div className="w-full p-5">
          <div className="px-4 sm:px-0">
            <h3 className="touch-action-none inline-block text-xl text-cyan-900 font-semibold leading-7">
              Classes
            </h3>
            <button
              type="button"
              onClick={() => {
                if (!(userSlice.permission == 'read')) {
                dispatch(toggleModalClass_Add())
                }
              }}
              className="ml-2 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
            >
              Add
            </button>

            <div className="mt-2 flex">
              {' '}
              <input
                placeholder="search class by number"
                className="w-full rounded-md"
                type="number"
                onChange={(e) => {
                  const currentSearch = e.target.value
                  if (currentSearch) {
                    for (const classes of data) {
                      if (
                        classes.name &&
                        classes.name == Number(currentSearch)
                      ) {
                        setMatchingElement(classes)
                        break
                      }
                    }
                  } else {
                    setMatchingElement(null)
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
              {matchingElement ? (
                <div
                onMouseDown={(e) => e.preventDefault()}
                key={String(matchingElement._id)}
                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 "
              >
                <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                  {matchingElement.name}
                </dt>
                <dd className="mb-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                  {matchingElement.teacher}
                </dd>
                <dd className="flex justify-start text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                  <button
                    type="button"
                    onClick={() => {
                      setSelect(matchingElement)
                      dispatch(toggleModalClass_Delete())
                    }}
                    className="h-8 mr-2 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelect(matchingElement)
                      dispatch(toggleModalClass_())
                    }}
                    className="h-8 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                  >
                    Edit
                  </button>
                </dd>
              </div>
              ) : (
                data.map((class_) => {
                  return (
                    <div
                      onMouseDown={(e) => e.preventDefault()}
                      key={String(class_._id)}
                      className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 "
                    >
                      <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                        {class_.name}
                      </dt>
                      <dd className="mb-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                        {class_.teacher}
                      </dd>
                      <dd className="flex justify-start text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                        <button
                          type="button"
                          onClick={() => {
                            setSelect(class_)
                            dispatch(toggleModalClass_Delete())
                          }}
                          className="h-8 mr-2 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelect(class_)
                            dispatch(toggleModalClass_())
                          }}
                          className="h-8 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                        >
                          Edit
                        </button>
                      </dd>
                    </div>
                  )
                })
              )}
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
