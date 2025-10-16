import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './component/Login'
import Register from './component/Register'
import Dasboard from './component/Dasboard'
import AttendanceCalendar from './component/AttendanceCalendar'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dasbord" element={<Dasboard />} />
      <Route path="/profile" element={<AttendanceCalendar />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App