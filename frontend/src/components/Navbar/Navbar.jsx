import { useState } from 'react'

export default function Navbar() {
  const [activeBar, setActiveBar] = useState(false)

  const handleClick = () => {
    setActiveBar(!activeBar)
  }

  return (
    <div className="w-screen h-auto">
      <div className="w-screen h-16 flex bg-neutral-950 ">
        <div className="w-2/4 h-full flex flex-col justify-center items-start">
          <img className="" src="" alt="Logo do site" />
        </div>
        <div className="w-2/4 h-full flex flex-col justify-center items-end ">
          <img className="" src="" alt="Menu" onClick={handleClick} />
        </div>
      </div>
      {activeBar && (
        <div className="bg-neutral-950">
          <h1 className="">a</h1>
        </div>
      )}
    </div>
  )
}
