import './css/App.css'

import Login from './components/Login/Login.jsx'
import Navbar from './components/Navbar/Navbar.jsx'

export default function App() {
  return (
    <div className="w-screen h-screen flex flex-col bg-neutral-400">
      <Navbar />
      <Login />
    </div>
  )
}
