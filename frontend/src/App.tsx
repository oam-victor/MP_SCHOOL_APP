import { Routes, Route } from 'react-router-dom'
import { Classes } from './pages/Classes'
import { Employees } from './pages/Employees'
import { Financial } from './pages/Financial'
import { Students } from './pages/Students'
import { Layout } from './components/Layout'
import './index.css'

function App() {
  return (
    <div className='min-w-min h-screen'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Students />} />
          <Route path="Classes" element={<Classes />} />
          <Route path="Employees" element={<Employees />} />
          <Route path="Financial" element={<Financial />} />
          <Route path="Students" element={<Students />} />

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
