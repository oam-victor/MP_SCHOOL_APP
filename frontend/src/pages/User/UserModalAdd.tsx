import type { Dispatch } from 'redux'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModalUserAdd } from '../../store/modalSlice'
import { default_profile } from '../../../images/images'
import axios from 'axios'

interface Data {
  uid: string
  email: string
  name: string
  photoURL: string
  permission: string
}

interface RootState {
  modal: {
    modalUser: boolean
    modalUserAdd: boolean
    modalUserDelete: boolean
  }
}

let nameFlag = true
let emailFlag = true

export const UserModalAdd = () => {
  const [userName, setUserName] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const [userPhotoURL] = useState<string>(default_profile)
  const [userPermission, setUserPermission] = useState<string>('')
  const [userUid] = useState<string>('')

  const modal: boolean = useSelector(
    (state: RootState) => state.modal.modalUserAdd,
  )

  const dispatch: Dispatch = useDispatch()
  const cancelButtonRef = useRef(null)

  const handleSubmit = async () => {
    try {
      const formData: Data = {
        name: userName,
        email: userEmail,
        photoURL: userPhotoURL,
        permission: userPermission,
        uid: userUid,
      }
      const response = await axios.post(
        `http://3.148.115.155:3000/api/user/`,
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
              dispatch(toggleModalUserAdd())
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
                            User Information
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Update user
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
                                  name="name"
                                  id="name"
                                  value={userName}
                                  onChange={(e) => {
                                    setUserName(e.target.value)
                                    // Test regular expression for numbers
                                    const updatedUserName = e.target.value
                                    if (!/\d/.test(updatedUserName)) {
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
                              <label
                                htmlFor="last-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Permission
                              </label>
                              <select
                                value={userPermission}
                                onChange={(e) => {
                                  setUserPermission(e.target.value)
                                }}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              >
                                <option value="admin">admin</option>
                                <option value="read">read</option>
                              </select>
                            </div>

                            <div className="sm:col-span-4">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email
                              </label>
                              <div className="mt-2">
                                <input
                                  id="address"
                                  name="address"
                                  value={userEmail}
                                  onChange={(e) => {
                                    setUserEmail(e.target.value)
                                    const email = e.target.value
                                    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                                    if (emailRegex.test(email)) {
                                      emailFlag = false
                                    } else {
                                      emailFlag = true
                                    }
                                  }}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {emailFlag && (
                                  <div className="text-sm font-thin text-red-400">
                                    Insert a valid email
                                  </div>
                                )}
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
                            dispatch(toggleModalUserAdd())
                          }}
                        >
                          Cancel
                        </button>
                        {nameFlag || emailFlag ? (
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
