import { Outlet, Link } from 'react-router-dom'
//import { toggleIsLogged } from '../store/loggedSlicer'
//import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

interface RootState {
  logged: {
    isLogged: boolean
  }
}

export const Layout = () => {
  //const dispatch = useDispatch();
  const isLogged: boolean = useSelector(
    (state: RootState) => state.logged.isLogged,
  )

  return (
    <>
      {!isLogged ? (
        <div className="flex flex-col h-full justify-between">
          <nav
            className="sm:grid sm:grid-cols-10 bg-gray-800 "
            onMouseDown={(e) => e.preventDefault()}
          >
            <div className="sm:w-full w-4/5 mx-auto flex justify-between items-center sm:col-span-1 sm:pt-0 pt-1">
              <p className="sm:mx-auto text-white font-mono sm:text-xl text-2xl font-bold">
                SRA
              </p>
              <p className="sm:hidden mr-1 sm:ml-5 text-white font-mono sm:text-xl text-2xl font-bold">
                PIC
              </p>
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
              <p className=" text-white font-mono text-xl font-bold">PIC</p>
            </div>
          </nav>
          <Outlet />
          <footer className="block h-14 bg-gray-800 w-full text-center py-2 text-white font-mono text-2xl font-bold">
            <p>SCHOOL RECORD APP</p>
          </footer>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}
