import type { Dispatch } from 'redux'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModalClass_ } from '../../store/modalSlice'
import { ObjectId } from 'mongoose'
import axios from 'axios'
import { UserPlus, TrashSimple } from '@phosphor-icons/react'

interface Data {
  _id?: ObjectId
  name: number
  students: ObjectId[]
  teacher: string
}

interface Student {
  _id?: ObjectId
  name?: string
  email?: string
  address?: string
  profile?: string
  age?: number
  phone_number?: number
  class_?: number
  grades?: number[]
}

interface Class_ModalProps {
  class_: Data | null
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

let nameFlag = false

export const Class_Modal = ({ class_ }: Class_ModalProps) => {
  const userSlice = useSelector((state: User_) => state.user)
  const modal: boolean = useSelector(
    (state: RootState) => state.modal.modalClass_,
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [class_Id, setClass_Id] = useState<any>(class_?._id)
  const [class_Name, setClass_Name] = useState<number>(class_?.name || 0)
  const [class_Teacher, setClass_Teacher] = useState<string>(
    class_?.teacher || '',
  )
  const [class_Students, setClass_Students] = useState<ObjectId[]>(
    class_?.students || [],
  )

  const [students, setStudents] = useState<Student[]>([])
  const [allStudents, setAllStudents] = useState<Student[]>([])
  const [searchFlag, setSearchFlag] = useState<boolean>(false)
  const [matchElements, setMatchElements] = useState<Student[]>([])

  useEffect(() => {
    setClass_Name((prevName) => class_?.name || prevName)
    setClass_Teacher((prevTeacher) => class_?.teacher || prevTeacher)
    setClass_Id((prevId: any) => class_?._id || prevId)
    setClass_Students((prevStudents) => class_?.students || prevStudents)
  }, [class_])

  //fetch data from students of the class
  useEffect(() => {
    setMatchElements([])
    setSearchFlag(false)
    const fetchData = async () => {
      const response: Student[] = []
      for (const student of class_Students) {
        try {
          const resp = await axios.get(
            `http://3.148.115.155:3000/api/students/${student}`,
          )
          response.push(resp.data)
        } catch (err) {
          console.log(err)
        }
      }

      setStudents(response)
    }
    fetchData()
  }, [class_Students])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`http://3.148.115.155:3000/api/students/`)
        setAllStudents(resp.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal])

  const dispatch: Dispatch = useDispatch()
  const cancelButtonRef = useRef(null)

  const handleSubmit = async () => {
    try {
      const formData: Data = {
        _id: class_Id,
        name: class_Name,
        students: class_Students,
        teacher: class_Teacher,
      }
      const response = await axios.put(
        `http://3.148.115.155:3000/api/class/${class_Id}`,
        formData,
      )
      console.log(response.status)
    } catch (err) {
      console.log(err)
    }
  }

  if (!class_) {
    return <div>No class_ selected</div>
  } else {
    return (
      <div>
        <Transition.Root show={modal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-1"
            initialFocus={cancelButtonRef}
            onClose={() => {
              dispatch(toggleModalClass_())
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
                      <div className="space-y-10">
                        <div>
                          <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Classes
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Update classes
                          </p>
                        </div>

                        <div className="">
                          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Class number
                              </label>
                              <div className="mt-2">
                                <input
                                  required
                                  type="number"
                                  name="name"
                                  id="name"
                                  value={class_Name}
                                  onChange={(e) => {
                                    setClass_Name(Number(e.target.value))
                                    // Test regular expression for numbers
                                    const updatedClass_Name = e.target.value
                                    const regex = /^\d+(\.\d+)?$/
                                    if (regex.test(updatedClass_Name)) {
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
                                  Class number should be positive
                                </div>
                              )}
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Teacher
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="position"
                                  id="position"
                                  value={class_Teacher}
                                  onChange={(e) =>
                                    setClass_Teacher(e.target.value)
                                  }
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="col-span-6">
                              <h3 className="inline text-base font-semibold -7 text-gray-900">
                                Class Students
                              </h3>

                              <div className="inline-block mb-2">
                                {' '}
                                <button
                                  type="button"
                                  className="ml-2 text-indigo-600 hover:opacity-50"
                                  onClick={() => {
                                    if (!(userSlice.permission == 'read')) {
                                    setSearchFlag(!searchFlag)
                                  }}}
                                >
                                  {' '}
                                  <UserPlus />{' '}
                                </button>
                              </div>

                              {searchFlag ? (
                                <div className="block mb-5">
                                  <input
                                    placeholder="search student"
                                    className="w-full rounded-md"
                                    type="text"
                                    onChange={(e) => {
                                      const currentSearch = e.target.value
                                      const matchingElements = []
                                      if (currentSearch) {
                                        for (const student of allStudents) {
                                          if (
                                            student.name &&
                                            student.name
                                              .toLowerCase()
                                              .includes(
                                                currentSearch.toLowerCase(),
                                              ) &&
                                            matchingElements.length < 5
                                          ) {
                                            matchingElements.push(student)
                                            setMatchElements(matchingElements)
                                          }
                                          if (matchingElements.length > 2) {
                                            break
                                          }
                                        }
                                      } else {
                                        setMatchElements([])
                                      }
                                    }}
                                  />
                                  <div>
                                    {matchElements.map((student) => (
                                      <div
                                        className=""
                                        key={String(student._id)}
                                      >
                                        <button
                                          className="mt-2 text-indigo-600 font-bold text-xs"
                                          type="button"
                                          onClick={async () => {
                                            
                                            //flag not to allow requests to repeasted names
                                            const flag = () => {
                                              for (const student_ of students) {
                                                if (
                                                  student_.name == student.name
                                                ) {
                                                  return 1
                                                }
                                              }
                                              return 0
                                            }
                                            if (!flag()) {
                                              try {
                                                setStudents((prevStudents) => {
                                                  const updatedStudents = [
                                                    ...prevStudents,
                                                    student,
                                                  ]
                                                  return updatedStudents
                                                })
                                                const resp = await axios.put(
                                                  `http://3.148.115.155:3000/api/class/${class_Id}/append/${student._id}`,
                                                )
                                                console.log(resp.status)
                                              } catch (err) {
                                                console.log(err)
                                              }
                                            }
                                          }}
                                        >
                                          {student.name}
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}

                              {students.map((student_) => {
                                return (
                                  <div
                                    className="flex justify-between"
                                    key={String(student_._id)}
                                  >
                                    <span>{student_.name}</span>
                                    <button
                                      type="button"
                                      className="text-indigo-600 hover:opacity-50"
                                      onClick={async () => {
                                        if (!(userSlice.permission == 'read')) {
                                          setStudents((prevStudents) => {
                                            const updatedStudents = prevStudents.filter(
                                              (currentStudent) =>
                                                currentStudent._id !==
                                                student_._id,
                                            )
                                            return updatedStudents
                                          })
                                          try {
                                            const resp = await axios.put(
                                              `http://3.148.115.155:3000/api/class/${class_Id}/pop/${student_._id}`,
                                            )
                                            console.log(resp.status)
                                          } catch (err) {
                                            console.log(err)
                                          }
                                        }
                                      }}
                                    >
                                      <TrashSimple />
                                    </button>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="button"
                          className="text-sm font-semibold leading-6 text-gray-900"
                          onClick={() => {
                            dispatch(toggleModalClass_())
                          }}
                        >
                          Cancel
                        </button>
                        {nameFlag || userSlice.permission == 'read' ? (
                          <button
                            disabled
                            type="button"
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
