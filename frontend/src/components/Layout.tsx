import { Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Home } from '../pages/Home'

interface RootState {
  logged: {
    isLogged: boolean
  }
}

interface UserState {
  user: {
    uid: string | null
    displayName: string | null
    email: string | null
    photoURL: string | null
  }
}

export const Layout = () => {
  const isLogged: boolean = useSelector(
    (state: RootState) => state.logged.isLogged,
  )

  const uid = useSelector((state: UserState) => state.user.uid)
  const photoURL = useSelector((state: UserState) => state.user.photoURL)
  const displayName = useSelector((state: UserState) => state.user.displayName)
  const email = useSelector((state: UserState) => state.user.email)

  const user = { uid, displayName, photoURL, email }

  return (
    <>
      {isLogged ? (
        <div className="flex flex-col h-full justify-between">
          <nav
            className="sm:grid sm:grid-cols-10 bg-gray-800 "
            onMouseDown={(e) => e.preventDefault()}
          >
            <div className="sm:w-full w-4/5 mx-auto flex justify-between items-center sm:col-span-1 sm:pt-0 pt-1">
              <p className="sm:mx-auto text-white font-mono sm:text-xl text-2xl font-bold">
                SRA
              </p>
              <div className="sm:hidden mr-1 sm:ml-5 text-white font-mono sm:text-xl text-2xl font-bold">
                <Link to="/Profile">
                  <button type="button">
                    {user.photoURL ? (
                      <img
                        className="rounded-full cursor-pointer hover:opacity-50"
                        width={'30rem'}
                        src={user.photoURL}
                        alt="profile"
                      ></img>
                    ) : (
                      <>NoUser</>
                    )}
                  </button>
                </Link>
              </div>
            </div>

            <div className="sm:col-span-8">
              <ul className="flex justify-evenly sm:justify-start sm:text-base text-sm">
                <li className="hidden">
                  <Link to="/">
                    <button
                      type="button"
                      className="inline-flex my-2 items-center justify-center rounded-md sm:p-2 p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <span>Home</span>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/Financial">
                    <button
                      type="button"
                      className="sm:m-2 m-1 items-center justify-center rounded-md sm:p-2 p-1 text-gray-400 hover:bg-gray-700 hover:text-white "
                    >
                      <span>Financial</span>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/Students">
                    <button
                      type="button"
                      className="sm:m-2 m-1 items-center justify-center rounded-md sm:p-2 p-1 text-gray-400 hover:bg-gray-700 hover:text-white "
                    >
                      <span>Students </span>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/Classes">
                    <button
                      type="button"
                      className="sm:m-2 m-1 items-center justify-center rounded-md sm:p-2 p-1 text-gray-400 hover:bg-gray-700 hover:text-white "
                    >
                      <span>Classes</span>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/Employees">
                    <button
                      type="button"
                      className="sm:m-2 m-1 items-center justify-center rounded-md sm:p-2 p-1 text-gray-400 hover:bg-gray-700 hover:text-white "
                    >
                      <span>Employees</span>
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sm:flex items-center justify-center hidden sm:col-span-1 ">
              <Link to="/Profile">
                <button type="button">
                  {user.photoURL ? (
                    <img
                      className="rounded-full cursor-pointer hover:opacity-50"
                      width={'30rem'}
                      src={user.photoURL}
                      alt="profile"
                    ></img>
                  ) : (
                    <>NoUser</>
                  )}
                </button>
              </Link>
            </div>
          </nav>
          <Outlet />
          <footer className="block h-14 bg-gray-800 w-full text-center py-2 text-white font-mono text-2xl font-bold">
            <p>SCHOOL RECORD APP</p>
          </footer>
        </div>
      ) : (
        <Home />
      )}
    </>
  )
}
