import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserModal } from './User/UserModal'
// import { UserModalAdd } from './User/UserModalAdd'
import { UserModalDelete } from './User/UserModalDelete'
import { useDispatch } from 'react-redux'
import { toggleModalUser } from '../store/modalSlice'
// import { toggleModalUserAdd } from '../store/modalSlice'
import { toggleModalUserDelete } from '../store/modalSlice'
import { ObjectId } from 'mongoose'

interface Data {
  _id: ObjectId
  uid: string
  email: string
  name: string
  photoURL: string
  password?: string
  permission: string
}

interface RootState {
  modal: {
    modalUser: boolean
    modalUserAdd: boolean
    modalUserDelete: boolean
  }
}

export const User = () => {
  const [data, setData] = useState<Data[] | null>(null)
  const [select, setSelect] = useState<Data | null>(null)
  const dispatch = useDispatch()

  // const modalAdd: boolean = useSelector(
  //   (state: RootState) => state.modal.modalUserAdd,
  // )

  const modalDelete: boolean = useSelector(
    (state: RootState) => state.modal.modalUserDelete,
  )

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = axios.get('http://localhost:3000/api/user')
      const responseData = (await response).data
      setData(responseData || [])
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="delay-300 mx-auto w-3/4">
      {select && <UserModal user={select} />}
      {/* {modalAdd && <UserModalAdd />} */}
      {modalDelete && select && <UserModalDelete id_={select?._id} />}
      {data ? (
        <div className="w-full p-5">
          <div className="px-4 sm:px-0">
            <h3 className="text-xl text-cyan-900 font-semibold leading-7">
              Users
            </h3>
            {/* <button
              type="button"
              onClick={() => {
                dispatch(toggleModalUserAdd())
              }}
              className="font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
            >
              Add
            </button> */}
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {data.map((user) => {
                return (
                  <div
                    onMouseDown={(e) => e.preventDefault()}
                    key={String(user.uid)}
                    className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 "
                  >
                    <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                      {user.name}
                    </dt>
                    <dd className="mb-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                      {user.email}
                    </dd>
                    <dd className="flex justify-start text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                      <button
                        type="button"
                        onClick={() => {
                          setSelect(user)
                          dispatch(toggleModalUserDelete())
                        }}
                        className="h-8 mr-2 font-semibold duration-300 border-gray-700 border-2 inline-flex items-center justify-center rounded-md px-1  hover:bg-gray-700 hover:text-white"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelect(user)
                          dispatch(toggleModalUser())
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
