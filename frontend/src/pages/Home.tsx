import { GoogleLogo, GithubLogo } from "@phosphor-icons/react";
import {GoogleAuthProvider, GithubAuthProvider, signInWithPopup} from 'firebase/auth'
import {auth} from '../services/firebase'

export const Home = () => {
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    try{
      const result = signInWithPopup(auth, provider);
      console.log(result);
    }catch(err){
      console.log(err);
    }
  }
  const handleGithubSignIn = () => {
    const provider = new GithubAuthProvider();
    try{
      const result = signInWithPopup(auth, provider);
      console.log(result);
    }catch(err){
      console.log(err);
    }
    
  }


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto h-10 w-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="text-center text-black font-bold text-2xl font-bold border-b-2">
            SRA
          </p>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <GoogleLogo size={"1rem"} weight="fill" />
              <span className="ml-2">Sign in with Google</span>

            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGithubSignIn}
              className="mt-4 flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <GithubLogo size={"1rem"} weight="fill" />
              <span className="ml-2"> Sign in with Github</span>

            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            School Record App
          </p>
        </div>
      </div>
    </>
  )
}