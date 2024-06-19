import './css/App.css'

import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'

export default function App() {
  return (
    <div className="w-screen h-screen flex flex-col bg-white">
      <Navbar />
      <Outlet />
    </div>
  )
}
