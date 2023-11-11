import { GoogleLogo, GithubLogo } from '@phosphor-icons/react'
import { useState } from 'react'
import { auth } from '../services/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { setUser } from '../store/userSlicer'
import { toggleIsLogged } from '../store/loggedSlicer'
import { toggleModalSignUp } from '../store/modalSlice'
import { toggleCredentials } from '../store/credentialsSlicer'
import { SignUpModal } from './SignUp/SignUp'
import axios from 'axios'

import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  linkWithPopup,
  UserCredential,
} from 'firebase/auth'

interface RootState {
  modal: {
    modalSignUp: boolean
  }
}
interface Credentials {
  credentials: {
    flag: boolean
  }
}

interface User_ {
  uid: string | null
  email: string | null
  name: string | null
  photoURL: string | null
  password?: string | null
  permission: string | null
}

let emailFlag = false
let passwordFlag = false
let userPermission = "read";

export const Home = () => {
  const [userEmail, setUserEmail] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  
  //=======================================================================================//
  const checkIfUserExist = async (user_: User_) => {

    let flag = false
    const users = await axios.get('http://3.148.115.155:3000/api/user')
    //Check if the user exists, if it exists set the flag
    for (const currentUser of users.data) {
      if (currentUser.uid && (currentUser.uid === user_.uid)) {
        userPermission = currentUser.permission;
        flag = !flag
        break
      }
    }

    //If the user does not exist signs it up
    if (!flag) {
      try {
        const response = await axios.post(
          `http://3.148.115.155:3000/api/user/`,
          user_,
        )
        console.log(response.status)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const credentialFlag: boolean = useSelector(
    (state: Credentials) => state.credentials.flag,
  )
  const modal: boolean = useSelector(
    (state: RootState) => state.modal.modalSignUp,
  )

  const dispatch: Dispatch = useDispatch()

  const InvalidCredentials = () => {
    return (
      <div className="mt-4 font-bold text-red-600 text-center">
        {credentialFlag ? 'INVALID CREDENTIALS' : null}
      </div>
    )
  }
  //=======================================================================================//
  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://3.148.115.155:3000/api/signin', {
        email: userEmail,
        password: userPassword,
      })
      const {
        uid,
        name,
        email,
        photoURL,
        permission,
      } = response.data.data[0]

      console.log(response.data.data[0]);
      const user: User_ = {
        uid: uid,
        name: name,
        email: email,
        photoURL: photoURL,
        permission: permission,
      }

      await dispatch(setUser(user))
      await dispatch(toggleIsLogged())
    } catch (err) {
      await dispatch(toggleCredentials())
      console.log('Invalid Credentials', err)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await auth.signOut()
    } catch (err) {
      console.log(err)
    }
    const provider = new GoogleAuthProvider()
    try {
      //fetch the users from mongoDB
      let result: UserCredential
      if (auth.currentUser) {
        result = await linkWithPopup(auth.currentUser, provider)
      } else {
        result = await signInWithPopup(auth, provider)
      }

      const { uid, displayName, email, photoURL } = result.user
      const user: User_ = {
        uid: uid,
        name: displayName,
        email: email,
        photoURL: photoURL,
        permission: userPermission,
      }

      await checkIfUserExist(user)

      user.permission = userPermission;

      await dispatch(setUser(user))
      await dispatch(toggleIsLogged())
    } catch (err) {
      console.log(err)
    }
  }
  //=======================================================================================//
  const handleGithubSignIn = async () => {
    const provider = new GithubAuthProvider()
    try {
      await auth.signOut()
    } catch (err) {
      console.log(err)
    }
    try {
      let result: UserCredential
      if (auth.currentUser) {
        result = await linkWithPopup(auth.currentUser, provider)
      } else {
        result = await signInWithPopup(auth, provider)
      }

      const { uid, displayName, email, photoURL } = result.user
      const user: User_ = {
        uid: uid,
        name: displayName,
        email: email,
        photoURL: photoURL,
        permission: 'read',
      }

      await checkIfUserExist(user)

      user.permission = userPermission;

      await dispatch(setUser(user))
      await dispatch(toggleIsLogged())
    } catch (err) {
      console.log(err)
    }
  }
  //=======================================================================================//
  return (
    <>
      {modal && <SignUpModal />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto h-10 w-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="text-center text-black text-2xl font-bold border-b-2">
            SRA
          </p>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form className="sm:mx-auto sm:w-full sm:max-w-sm">
          <label className="mt-10 mb-2 block text-sm font-medium w-full max-w-3xl text-gray-900">
            Username:
            <input
              required
              type="text"
              className="w-full ml-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            />
          </label>
          {emailFlag && (
            <div className="text-sm font-thin text-red-400">
              Insert a valid email
            </div>
          )}

          <label className="my-2 block text-sm font-medium w-full max-w-3xl text-gray-900">
            Password:
            <input
              required
              type="password"
              className="w-full ml-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                setUserPassword(e.target.value)
                const updated_password = e.target.value
                const passwordRegex = /^.{8,}$/
                if (passwordRegex.test(updated_password)) {
                  passwordFlag = false
                } else {
                  passwordFlag = true
                }
              }}
            />
          </label>
          {passwordFlag && (
            <div className="text-sm font-thin text-red-400">
              Password is too short
            </div>
          )}

          {!emailFlag && !passwordFlag ? (
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <button
                type="button"
                onClick={handleSignIn}
                className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="ml-2">Sign in</span>
              </button>
            </div>
          ) : (
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <button
                disabled
                type="button"
                onClick={handleSignIn}
                className="opacity-50 flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="ml-2">Sign in</span>
              </button>
            </div>
          )}
        </form>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="mt-4 flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <GoogleLogo size={'1rem'} weight="fill" />
              <span className="ml-2">Sign in with Google</span>
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGithubSignIn}
              className="mt-4 flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <GithubLogo size={'1rem'} weight="fill" />
              <span className="ml-2"> Sign in with Github</span>
            </button>
            {InvalidCredentials()}
          </div>

          <button
            onClick={() => {
              dispatch(toggleModalSignUp())
            }}
            className="w-full mt-10 text-center text-sm text-gray-500"
          >
            <span>Not signed up? Create account.</span>
          </button>
        </div>
      </div>
    </>
  )
}
