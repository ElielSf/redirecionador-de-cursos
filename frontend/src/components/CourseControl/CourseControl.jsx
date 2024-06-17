import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CourseUpdate() {
  const { state } = useParams()
  const location = useLocation()
  const courseData = location.state

  const [success, setSuccess] = useState(0)
  const [newData, setNewData] = useState({
    name_course: '',
    objective_course: '',
    link_course: '',
    tag_course: '',
  })

  useEffect(() => {
    setNewData((prevState) => ({
      ...prevState,
      name_course: courseData.name_course,
      objective_course: courseData.objective_course,
      link_course: courseData.link_course,
      tag_course: courseData.tag_course,
    }))
  }, [])

  const redirectDelay = async () => {
    if (success === 1) {
      setInterval(() => {
        window.history.back()
      }, 3000)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewData((prevState) => ({ ...prevState, [name]: value }))
  }

  const notifySuccess = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }

  const notifyFailed = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }

  const handleDelete = async (e) => {
    try {
      e.preventDefault()
      const responseDel = await fetch(
        `http://localhost:6777/cursos/${courseData.id_course}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        },
      )
      const jsonDel = await responseDel.json()
      if (jsonDel.error) {
        notifyFailed(jsonDel.message)
      }
      if (jsonDel.result === true) {
        notifySuccess(jsonDel.message)
        setSuccess(1)
        redirectDelay()
        setSuccess(0)
      }
    } catch (err) {
      notifyFailed(
        'Houve um erro no processo de deletar o anúncio, tente novamente mais tarde.',
      )
    }
  }

  const handleUpdate = async (e) => {
    try {
      e.preventDefault()
      const responseUpd = await fetch(
        `http://localhost:6777/cursos/${courseData.id_course}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(newData),
        },
      )
      const jsonUpd = await responseUpd.json()
      if (jsonUpd.result === true) {
        notifySuccess(jsonUpd.message)
        setSuccess(1)
        redirectDelay()
        setSuccess(0)
      }
      if (jsonUpd.result === false || jsonUpd.error) {
        notifyFailed(jsonUpd.message)
      }
    } catch (err) {
      notifyFailed(
        'Houve um erro no processo de atualização do curso, tente novamente mais tarde.',
      )
    }
    window.history.back()
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <ToastContainer />
      <h1 className="w-screen h-auto mt-4 text-center text-2xl md:text-4xl xl:text-5xl">
        Atualização do Anúncio | Id:
        <strong className="text-purple-700"> {courseData.id_course}</strong>
      </h1>
      <form
        className="w-screen h-auto mt-4 flex flex-col bg-gray-200"
        id="course-update-form"
        onSubmit={handleUpdate}
      >
        <div className="w-screen h-16 md:h-24 xl:h-36 mt-4 flex flex-col justify-center mb-3">
          <label
            className="self-center mb-2 font-semibold text-lg md:text-3xl xl:text-4xl"
            htmlFor="name_course"
          >
            NOME DO CURSO
          </label>
          <input
            className="w-11/12 xl:h-16 pl-2 text-lg md:text-3xl xl:text-4xl self-center border-2 border-black rounded-lg"
            name="name_course"
            type="text"
            value={newData.name_course}
            onChange={handleChange}
            title="Campo de nome do curso"
            minLength="5"
            required
          />
        </div>
        <div className="w-screen h-16 md:h-24 xl:h-36 mt-4 flex flex-col justify-center mb-3">
          <label
            className="self-center mb-2 font-semibold text-lg md:text-3xl xl:text-4xl"
            htmlFor="objective_course"
          >
            OBJETIVO DO CURSO
          </label>
          <input
            className="w-11/12 xl:h-16 pl-2 text-lg md:text-3xl xl:text-4xl self-center border-2 border-black rounded-lg"
            name="objective_course"
            type="text"
            value={newData.objective_course}
            onChange={handleChange}
            title="Campo de objetivo do curso"
            required
          />
        </div>
        <div className="w-screen h-16 md:h-24 xl:h-36 mt-4 flex flex-col justify-center mb-3">
          <label
            className="self-center mb-2 font-semibold text-lg md:text-3xl xl:text-4xl"
            htmlFor="link_course"
          >
            LINK PARA O SITE DO CURSO
          </label>
          <input
            className="w-11/12 xl:h-16 pl-2 text-lg md:text-3xl xl:text-4xl self-center border-2 border-black rounded-lg"
            name="link_course"
            type="url"
            value={newData.link_course}
            onChange={handleChange}
            title="Campo de link do site do curso"
            required
          />
        </div>
        <h2 className="text-center font-semibold text-lg md:text-3xl mb-3 xl:text-4xl xl:mb-10">
          ÁREA DE ATUAÇÃO
        </h2>
        <div className="w-screen h-32 md:h-48 xl:h-64 flex flex-wrap mb-3">
          <div className="w-screen h-1/5">
            <input
              className="ml-2 md:w-10 md:h-6 xl:w-10 xl:h-8"
              id="UxUi"
              name="tag_course"
              type="radio"
              value="UX/UI"
              checked={newData.tag_course === 'UX/UI'}
              onChange={handleChange}
              title="Campo de tag do curso"
              required
            />
            <label className="ml-2 md:text-3xl xl:text-4xl" htmlFor="UxUi">
              User Experience/User Interface
            </label>
          </div>
          <div className="w-screen h-1/5">
            <input
              className="ml-2 md:w-10 md:h-6 xl:w-10 xl:h-8"
              id="Web"
              name="tag_course"
              type="radio"
              value="WEB"
              checked={newData.tag_course === 'WEB'}
              onChange={handleChange}
              title="Campo de tag do curso"
              required
            />
            <label className="ml-2 md:text-3xl xl:text-4xl" htmlFor="Web">
              Desenvolvimento Web
            </label>
          </div>
          <div className="w-screen h-1/5">
            <input
              className="ml-2 md:w-10 md:h-6 xl:w-10 xl:h-8"
              id="Backend"
              name="tag_course"
              type="radio"
              value="BACKEND"
              checked={newData.tag_course === 'BACKEND'}
              onChange={handleChange}
              title="Campo de tag do curso"
              required
            />
            <label className="ml-2 md:text-3xl xl:text-4xl" htmlFor="Backend">
              Backend
            </label>
          </div>
        </div>
      </form>
      <div className="w-screen h-auto text-center flex flex-wrap justify-center items-center">
        <button
          className="w-1/3 h-14 md:h-20 m-2 md:m-6 text-xl md:text-3xl rounded-md text-white bg-violet-700 hover:bg-violet-900 xl:h-32 xl:text-5xl"
          type="submit"
          form="course-update-form"
        >
          Atualizar
        </button>
        <button
          className="w-1/3 h-14 md:h-20 m-2 md:m-6 text-xl md:text-3xl rounded-md text-white bg-red-600 xl:h-32 xl:text-5xl"
          onClick={handleDelete}
        >
          Deletar
        </button>
        <a
          className="w-1/3 h-14 md:h-20 text-xl md:text-3xl rounded-md text-white bg-green-700 hover:bg-green-900 xl:h-32 xl:text-5xl xl:mb-4"
          href={newData.link_course}
        >
          <button className="w-full h-full">Visitar site</button>
        </a>
      </div>
    </div>
  )
}
