import { useState } from "react"

export default function Navbar() {
    const [activeBar, setActiveBar] = useState(false);

    const handleClick = () => {
        setActiveBar(!activeBar)
    }

    return (
        <div class="w-screen">
            <div class="w-screen h-16 flex bg-neutral-950 ">
                <div class="w-2/4 h-full flex flex-col justify-center items-start">
                    <img class="" src="" alt="Logo do site" />
                </div>
                <div class="w-2/4 h-full flex flex-col justify-center items-end ">
                    <img class="" src="" alt="Menu" onClick={handleClick}/>
                </div>
            </div>
            {activeBar &&
                <div class="bg-neutral-950">
                    <h1 class="">a</h1>
                </div>
            } 
        </div>
    )
}