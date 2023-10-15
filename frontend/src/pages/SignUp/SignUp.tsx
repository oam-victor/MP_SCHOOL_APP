import { Dialog, Transition } from '@headlessui/react'
import { default_profile } from '../../../images/images'
import { Fragment, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { Dispatch } from 'redux'
import { toggleModalSignUp } from '../../store/modalSlice'
import { toggleCredentials } from '../../store/credentialsSlicer'
import axios from 'axios'

interface User_ {
  uid: string
  name: string
  email: string
  photoURL: string
  password: string
  permission: string
}

interface RootState {
  modal: {
    modalSignUp: boolean
  }
}

let emailFlag = true
let passwordFlag = true

export const SignUpModal = () => {
  const [signUp_Name, setSignUpName] = useState<string>('')
  const [signUp_uid, setSignUp_uid] = useState<string>('')
  const [signUp_email, setSignUp_email] = useState<string>('')
  const [signUp_photoURL, setSignUp_photoURL] = useState<string>('')
  const [signUp_password, setSignUp_password] = useState<string>('')

  const modal: boolean = useSelector(
    (state: RootState) => state.modal.modalSignUp,
  )

  const dispatch: Dispatch = useDispatch()
  const cancelButtonRef = useRef(null)

  const handleSubmit = async () => {
    try {
      const formData: User_ = {
        name: signUp_Name,
        uid: signUp_uid || '',
        email: signUp_email,
        photoURL: signUp_photoURL || default_profile,
        password: signUp_password,
        permission: 'read'
      }
      await axios.post(`http://52.14.220.72:3000/api/user/`, formData)
      dispatch(toggleModalSignUp())
    } catch (err) {
      dispatch(toggleCredentials())
      dispatch(toggleModalSignUp())
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
            setSignUpName('')
            setSignUp_uid('')
            setSignUp_email('')
            setSignUp_photoURL('')
            setSignUp_password('')
            dispatch(toggleModalSignUp())
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
                          User
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Create User
                        </p>
                      </div>

                      <div className="">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                type="text"
                                name="signUp_number"
                                id="signUp_number"
                                onChange={(e) => {
                                  setSignUp_email(e.target.value)
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
                            </div>
                            {emailFlag && (
                              <div className="text-sm font-thin text-red-400">
                                Insert a valid email
                              </div>
                            )}
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Password
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                type="password"
                                name="password"
                                id="password"
                                value={signUp_password}
                                onChange={(e) => {
                                  setSignUp_password(e.target.value)
                                  const updated_password = e.target.value
                                  const passwordRegex = /^.{8,}$/
                                  if (passwordRegex.test(updated_password)) {
                                    passwordFlag = false
                                  } else {
                                    passwordFlag = true
                                  }
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {passwordFlag && (
                              <div className="text-sm font-thin text-red-400">
                                Password is too short
                              </div>
                            )}
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Name
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                type="text"
                                name="name"
                                id="name"
                                value={signUp_Name}
                                onChange={(e) => {
                                  setSignUpName(e.target.value)
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
                          dispatch(toggleModalSignUp())
                        }}
                      >
                        Cancel
                      </button>
                      {emailFlag || passwordFlag ? (
                        <button
                          disabled
                          type="button"
                          className="opacity-30 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            handleSubmit()
                          }}
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
