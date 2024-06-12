import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMenu } from 'react-icons/io5'

export default function Navbar() {
  const [activeBar, setActiveBar] = useState(false)

  const handleClick = () => {
    setActiveBar(!activeBar)
  }

  return (
    <div className="w-screen text-white text-lg">
      <div className="w-screen h-16 flex bg-neutral-950">
        <div className="w-2/4 h-full flex flex-col justify-center items-start pl-4">
          <img className="" src="" alt="Logo do site" />
        </div>
        <div className="w-2/4 h-full flex flex-col justify-center items-end pr-4">
          <IoMenu className="w-8 h-8" onClick={handleClick} />
        </div>
      </div>
      {activeBar && (
        <div className="w-screen h-32 bg-neutral-950 border-t-2 flex flex-col justify-evenly items-end pr-4">
          <Link to="/perfil">
            <p>Perfil</p>
          </Link>
          <Link to="/cursos">
            <p>Cursos</p>
          </Link>
          <Link to="/contato">
            <p>Contate-nos</p>
          </Link>
        </div>
      )}
    </div>
  )
}
