import type { Dispatch } from 'redux'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModalStudent } from '../../store/modalSlice'
import { ObjectId } from 'mongoose'
import axios from 'axios'

interface Data {
  _id: ObjectId
  name: string
  email: string
  address: string
  profile: string
  age: number
  phone_number: number
  class_: number
  grades: number[]
}

interface StudentModalProps {
  student: Data | null
}

interface RootState {
  modal: {
    modalStudent: boolean
    modalStudentAdd: boolean
    modalStudentDelete: boolean
  }
}

let nameFlag  = false
let ageFlag  = false
let classFlag = false

export const StudentModal = ({ student }: StudentModalProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [studentId, setStudentId] = useState<any>(student?._id)
  const [studentProfile, setStudentProfile] = useState<string>(
    student?.name || '',
  )
  const [studentName, setStudentName] = useState<string>(student?.name || '')
  const [studentEmail, setStudentEmail] = useState<string>(student?.email || '')
  const [studentAddress, setStudentAddress] = useState<string>(
    student?.address || '',
  )
  const [studentAge, setStudentAge] = useState<number>(student?.age || 0)
  const [studentPhone, setStudentPhone] = useState<number>(
    student?.phone_number || 0,
  )
  const [studentClass, setStudentClass] = useState<number>(student?.class_ || 0)
  const [studentGrade0, setStudentGrade0] = useState<number>(
    student?.grades[0] || 0,
  )
  const [studentGrade1, setStudentGrade1] = useState<number>(
    student?.grades[1] || 0,
  )
  const [studentGrade2, setStudentGrade2] = useState<number>(
    student?.grades[2] || 0,
  )

  useEffect(() => {
    setStudentName(student?.name || '')
    setStudentEmail(student?.email || '')
    setStudentAddress(student?.address || '')
    setStudentAge(student?.age || 0)
    setStudentPhone(student?.phone_number || 0)
    setStudentClass(student?.class_ || 0)
    setStudentGrade0(student?.grades[0] || 0)
    setStudentGrade1(student?.grades[1] || 0)
    setStudentGrade2(student?.grades[2] || 0)
    setStudentId(student?._id)
    setStudentProfile(student?.profile || '')
  }, [student])

  const modal: boolean = useSelector(
    (state: RootState) => state.modal.modalStudent,
  )
  const dispatch: Dispatch = useDispatch()
  const cancelButtonRef = useRef(null)

  const handleSubmit = async () => {
    try {
      const formData: Data = {
        _id: studentId,
        name: studentName,
        email: studentEmail,
        address: studentAddress,
        profile: studentProfile,
        age: studentAge,
        phone_number: studentPhone,
        class_: studentClass,
        grades: [studentGrade0, studentGrade1, studentGrade2],
      }
      const response = await axios.put(
        `http://localhost:3000/api/students/${studentId}`,
        formData,
      )
      console.log(response.status)
    } catch (err) {
      console.log(err)
    }
  }

  if (!student) {
    return <div>No student selected</div>
  } else {
    return (
      <div>
        <Transition.Root show={modal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-1"
            initialFocus={cancelButtonRef}
            onClose={() => {
              dispatch(toggleModalStudent())
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
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
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
                                  value={studentName}
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
                                  type="number"
                                  name="age"
                                  id="age"
                                  value={studentAge}
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
                                  type="number"
                                  name="class"
                                  id="class"
                                  value={studentClass}
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
                                Class should be between 1-99
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
                                  type="number"
                                  name="number"
                                  id="number"
                                  value={studentPhone}
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
                                  id="email"
                                  name="email"
                                  value={studentEmail}
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
                                  id="address"
                                  name="address"
                                  value={studentAddress}
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
                                  value={studentGrade0}
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
                                  value={studentGrade1}
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
                                  value={studentGrade2}
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
                          onClick={() => {
                            dispatch(toggleModalStudent())
                          }}
                        >
                          Cancel
                        </button>
                        {nameFlag || classFlag || ageFlag ? (
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
}
