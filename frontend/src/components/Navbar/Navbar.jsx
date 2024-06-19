import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/PATHIA.png'

import { IoMenu } from 'react-icons/io5'
import { FaGithub, FaHome } from 'react-icons/fa'
import { IoIosCreate } from 'react-icons/io'

export default function Navbar() {
  const [activeBar, setActiveBar] = useState(false)

  const handleClick = () => {
    setActiveBar(!activeBar)
  }

  const logoClick = () => {
    if (activeBar === true) {
      setActiveBar(false)
    }
  }

  return (
    <div className="w-screen text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl">
      <div className="w-screen h-12 md:h-20 xl:h-28 flex bg-neutral-950">
        <div className="w-2/4 h-full flex flex-col justify-center items-start pl-4">
          <Link className="hover:opacity-75" to="/">
            <img
              className="h-16 md:h-24"
              src={logo}
              alt="Logo do site"
              onClick={logoClick}
            />
          </Link>
        </div>
        <div className="w-2/4 h-full flex flex-col justify-center items-end pr-4">
          <IoMenu
            className="w-8 h-8 md:w-14 md:h-14 hover:text-zinc-400 cursor-pointer"
            onClick={handleClick}
          />
        </div>
      </div>
      {activeBar && (
        <div className="w-screen h-32 md:h-52 bg-neutral-950 border-t-2 flex flex-col justify-evenly items-end pr-4">
          <Link
            className="flex hover:text-zinc-400"
            to="/"
            onClick={handleClick}
          >
            <p>Home</p>
            <FaHome className="ml-2 self-center" />
          </Link>
          <Link
            className="flex hover:text-zinc-400"
            to="/cursos/criar"
            onClick={handleClick}
          >
            <p>Criar Anúncio</p>
            <IoIosCreate className="ml-2 self-center" />
          </Link>
          <Link
            className="flex hover:text-zinc-400"
            to="https://github.com/ElielSf"
            onClick={handleClick}
          >
            <p>Contato</p>
            <FaGithub className="ml-2 self-center" />
          </Link>
        </div>
      )}
    </div>
  )
}
