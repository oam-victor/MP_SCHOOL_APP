import type { Dispatch } from 'redux'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModalClass_Add } from '../../store/modalSlice'
import { ObjectId } from 'mongoose'
import axios from 'axios'

interface Data {
  name: number,
  students: ObjectId[],
  teacher: string
}

interface RootState {
  modal: {
    modalClass_: boolean
    modalClass_Add: boolean
    modalClass_Delete: boolean
  }
}

let nameFlag = true

export const Class_ModalAdd = () => {
  const [class_Name, setClass_Name] = useState<number>(0)
  const [class_Teacher, setClass_Teacher] = useState<string>('')
  const [class_Students, setClass_Students] = useState<ObjectId[]>([])

  const modal: boolean = useSelector(
    (state: RootState) => state.modal.modalClass_Add,
  )

  const dispatch: Dispatch = useDispatch()
  const cancelButtonRef = useRef(null)

  const handleSubmit = async () => {
    try {
      const formData: Data = {
        name: class_Name,
        students: class_Students,
        teacher: class_Teacher,
      }
      const response = await axios.post(
        `http://localhost:3000/api/class/`,
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
            setClass_Name(0)
            setClass_Students([])
            setClass_Teacher('')
            dispatch(toggleModalClass_Add())
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
                          Classes
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Update class
                        </p>
                      </div>

                      <div className="">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Class number
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                type="number"
                                name="class_number"
                                id="class_number"
                                onChange={(e) => {
                                  setClass_Name(Number(e.target.value))
                                  // Test regular expression for numbers
                                  const updatedClass_Name = e.target.value
                                  const regex = /^\d+(\.\d+)?$/;
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
                                name="teacher"
                                id="teacher"
                                value={class_Teacher}
                                onChange={(e) =>
                                  setClass_Teacher(e.target.value)
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
                          dispatch(toggleModalClass_Add())
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
