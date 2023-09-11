import { Routes, Route } from 'react-router-dom'
import { Class_ } from './pages/Classes'
import { Employees } from './pages/Employees'
import { Financial } from './pages/Financial'
import { Students } from './pages/Students'
import { User } from './pages/User'
import { Layout } from './components/Layout'
import './index.css'
import { Profile } from './pages/Profile'

function App() {
  return (
    <div className='min-w-min h-screen'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path="Classes" element={<Class_ />} />
          <Route path="Employees" element={<Employees />} />
          <Route path="Financial" element={<Financial />} />
          <Route path="Students" element={<Students />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="User" element={<User />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. 

          <Route path="*" element={<NoMatch />} />*/}
        </Route>
      </Routes>
    </div>
  )
}

export default App
