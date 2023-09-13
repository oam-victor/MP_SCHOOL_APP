import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { toggleIsLogged } from '../store/loggedSlicer'
import { auth } from '../services/firebase'

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

export const Profile = () => {
  // Use useSelector to get the state.user slice from the Redux store
  const userSlice = useSelector((state: User_) => state.user)
  const dispatch: Dispatch = useDispatch()

  // Use useMemo to memoize the object returned by the selector
  const currentUser: User_ = React.useMemo(() => {
    return {
      user: {
        uid: userSlice.uid,
        email: userSlice.email,
        name: userSlice.name,
        photoURL: userSlice.photoURL,
        password: userSlice.password,
        permission: userSlice.permission,
      },
    }
  }, [userSlice])

  return (
    <div className="py-5 my-5 border-2 mx-auto w-2/3 sm:w-1/3 rounded-lg shadow-xl">
      <div className="">
        <img
          className="shadow-xl border-2 border-gray-700 py-auto mx-auto rounded-full"
          width={'120rem'}
          src={currentUser.user.photoURL}
          alt="profile"
        ></img>
        <p className="text-gray-700 w-full text-center text-lg mt-2 font-extrabold">
          {userSlice.name}
        </p>
      </div>

      <div>
        <p className="text-gray-700 border-b-2 border-white text-lg font-bold mx-5 mt-10 pb-1">
          EMAIL
        </p>
        <span className="mx-5 font-normal">{userSlice.email}</span>
        <p className="text-gray-700 border-b-2 border-white text-lg font-bold mx-5 mt-10 pb-1">
          PERMISSION
        </p>
        <span className="mx-5 font-normal">{userSlice.permission}</span>
      </div>

      <button
        type="button"
        className="w-full sm:my-2 my-1 items-center justify-center rounded-md sm:py-2 py-1 text-black hover:text-gray-400 "
        onClick={async () => {
          try {
            await auth.signOut()
          } catch (err) {
            console.log(err)
          }
          await dispatch(toggleIsLogged())
        }}
      >
        <span className="">Logout</span>
      </button>
    </div>
  )
}
