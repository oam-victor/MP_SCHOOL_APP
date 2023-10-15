import type { Dispatch } from 'redux'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModalStudentAdd } from '../../store/modalSlice'
import axios from 'axios'

interface Data {
  name: string
  email: string
  address: string
  profile: string
  age: number
  phone_number: number
  class_: number
  grades: number[]
}

interface RootState {
  modal: {
    modalStudent: boolean
    modalStudentAdd: boolean
    modalStudentDelete: boolean
  }
}

let nameFlag = true
let ageFlag = true
let classFlag = true

export const StudentModalAdd = () => {
  const [studentProfile, setStudentProfile] = useState<string>('')
  const [studentName, setStudentName] = useState<string>('')
  const [studentEmail, setStudentEmail] = useState<string>('')
  const [studentAddress, setStudentAddress] = useState<string>('')
  const [studentAge, setStudentAge] = useState<number>(0)
  const [studentPhone, setStudentPhone] = useState<number>(0)
  const [studentClass, setStudentClass] = useState<number>(0)
  const [studentGrade0, setStudentGrade0] = useState<number>(0)
  const [studentGrade1, setStudentGrade1] = useState<number>(0)
  const [studentGrade2, setStudentGrade2] = useState<number>(0)

  const modal: boolean = useSelector(
    (state: RootState) => state.modal.modalStudentAdd,
  )

  const dispatch: Dispatch = useDispatch()
  const cancelButtonRef = useRef(null)

  const handleSubmit = async () => {
    try {
      const formData: Data = {
        name: studentName,
        email: studentEmail,
        address: studentAddress,
        profile: studentProfile,
        age: studentAge,
        phone_number: studentPhone,
        class_: studentClass,
        grades: [studentGrade0, studentGrade1, studentGrade2],
      }

      const response = await axios.post(
        `http://52.14.220.72:3000/api/students/`,
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
            setStudentName('')
            setStudentEmail('')
            setStudentAddress('')
            setStudentAge(0)
            setStudentPhone(0)
            setStudentClass(0)
            setStudentGrade0(0)
            setStudentGrade1(0)
            setStudentGrade2(0)
            setStudentProfile('')
            dispatch(toggleModalStudentAdd())
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
                                name="first-name"
                                id="first-name"
                                onChange={(e) => {
                                  setStudentName(e.target.value)
                                  // Test regular expression for numbers
                                  const updatedStudentName = e.target.value
                                  if (!/\d/.test(updatedStudentName)) {
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
                              Age
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                type="number"
                                name="age"
                                id="age"
                                onChange={(e) => {
                                  setStudentAge(Number(e.target.value))
                                  const updatedStudentAge = Number(
                                    e.target.value,
                                  )
                                  if (
                                    /^(?:[4-9]|[1-9][0-9]|1[01][0-9]|1[02][0-9]|130)$/.test(
                                      String(updatedStudentAge),
                                    )
                                  ) {
                                    ageFlag = false
                                  } else {
                                    ageFlag = true
                                  }
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {ageFlag && (
                              <div className="text-sm font-thin text-red-400">
                                Age should be between 4-130
                              </div>
                            )}
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="class"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Class
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                type="number"
                                name="class"
                                id="class"
                                value='0'
                                disabled
                                onChange={(e) => {
                                  setStudentClass(Number(e.target.value))
                                  const updatedStudentClass = Number(
                                    e.target.value,
                                  )
                                  if (
                                    /^(?:[1-9]|[1-9][0-9])$/.test(
                                      String(updatedStudentClass),
                                    )
                                  ) {
                                    classFlag = false
                                  } else {
                                    classFlag = true
                                  }
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {classFlag && (
                              <div className="text-sm font-thin text-red-400">
                                Add student to class in classes tab
                              </div>
                            )}
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="number"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Phone
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                type="number"
                                name="number"
                                id="number"
                                onChange={(e) =>
                                  setStudentPhone(Number(e.target.value))
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                id="email"
                                name="email"
                                onChange={(e) =>
                                  setStudentEmail(e.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Address
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                id="address"
                                name="address"
                                onChange={(e) =>
                                  setStudentAddress(e.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="grade1"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Grade1
                            </label>
                            <div className="mt-2">
                              <input
                                type="number"
                                name="grade1"
                                id="grade1"
                                onChange={(e) =>
                                  setStudentGrade0(Number(e.target.value))
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="grade2"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Grade2
                            </label>
                            <div className="mt-2">
                              <input
                                type="number"
                                name="grade2"
                                id="grade2"
                                onChange={(e) =>
                                  setStudentGrade1(Number(e.target.value))
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="grade3"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Grade3
                            </label>
                            <div className="mt-2">
                              <input
                                type="number"
                                name="grade3"
                                id="grade3"
                                onChange={(e) =>
                                  setStudentGrade2(Number(e.target.value))
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
                      >
                        Cancel
                      </button>
                      {(nameFlag || ageFlag) ? (
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
