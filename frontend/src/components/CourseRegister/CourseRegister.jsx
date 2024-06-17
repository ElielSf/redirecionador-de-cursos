import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CourseRegister() {
  const [courseData, setCourseData] = useState({
    name_course: '',
    objective_course: '',
    link_course: '',
    tag_course: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCourseData((prevState) => ({ ...prevState, [name]: value }))
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      const response = await fetch('http://localhost:6777/cursos', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(courseData),
      })
      const json = await response.json()

      console.log('\nJson: ' + json.message + '\nStatus: ' + json.result)
      if (json.result === true) {
        notifySuccess(json.message)
      }
      if (json.result === false || json.error) {
        notifyFailed(json.message || 'Erro na criação, verifique os campos.')
      }
      if (json.result === null) {
        notifyFailed('Erro desconhecido, tente novamente mais tarde.')
      }
    } catch (err) {
      console.error('erro: ' + err.stack)
      notifyFailed('Erro ao realizar a criação do anúncio.')
    }
    window.history.back()
  }

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      <ToastContainer />
      <form
        className="w-screen h-full mt-4"
        id="course-register-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="w-screen h-16 md:h-24 flex flex-col justify-center mb-3 md:mb-6">
          <label
            className="mb-1 font-semibold text-lg md:text-3xl self-center"
            htmlFor="name_course"
          >
            NOME DO CURSO
          </label>
          <input
            className="w-11/12 md:h-3/5 pl-2 text-lg md:text-3xl self-center border-2 border-black rounded-lg"
            name="name_course"
            type="text"
            value={courseData.name_course}
            onChange={handleChange}
            title="Campo de nome do curso"
            minLength="5"
            required
          />
        </div>
        <div className="w-screen h-16 md:h-24 flex flex-col justify-center mb-3 md:mb-6">
          <label
            className="mb-1 font-semibold text-lg md:text-3xl self-center"
            htmlFor="objective_course"
          >
            OBJETIVO DO CURSO
          </label>
          <input
            className="w-11/12 md:h-3/5 pl-2 text-lg md:text-3xl self-center border-2 border-black rounded-lg"
            name="objective_course"
            type="text"
            value={courseData.objective_course}
            onChange={handleChange}
            title="Campo de objetivo do curso"
            required
          />
        </div>
        <div className="w-screen h-16 md:h-24 flex flex-col justify-center mb-3 md:mb-6">
          <label
            className="mb-1 font-semibold text-lg md:text-3xl self-center"
            htmlFor="link_course"
          >
            LINK PARA O SITE DO CURSO
          </label>
          <input
            className="w-11/12 md:h-3/5 pl-2 text-lg md:text-3xl self-center border-2 border-black rounded-lg"
            name="link_course"
            type="url"
            value={courseData.link_course}
            onChange={handleChange}
            title="Campo de link do site do curso"
            required
          />
        </div>
        <h2 className="mb-1 font-semibold text-lg md:text-3xl text-center md:mb-6">
          ÁREA DE ATUAÇÃO
        </h2>
        <div className="w-screen h-1/5 flex flex-wrap mb-3">
          <div className="w-screen h-1/5">
            <input
              className="ml-2 w-4 h-3 md:w-7 md:h-6"
              id="UxUi"
              name="tag_course"
              type="radio"
              value="UX/UI"
              checked={courseData.tag_course === 'UX/UI'}
              onChange={handleChange}
              title="Campo de tag do curso"
              required
            />
            <label className="ml-2 text-lg md:text-3xl" htmlFor="UxUi">
              User Experience/User Interface
            </label>
          </div>
          <div className="w-screen h-1/5">
            <input
              className="ml-2 w-4 h-3 md:w-7 md:h-6"
              id="Web"
              name="tag_course"
              type="radio"
              value="WEB"
              checked={courseData.tag_course === 'WEB'}
              onChange={handleChange}
              title="Campo de tag do curso"
              required
            />
            <label className="ml-2 text-lg md:text-3xl" htmlFor="Web">
              Desenvolvimento Web
            </label>
          </div>
          <div>
            <input
              className="ml-2 w-4 h-3 md:w-7 md:h-6"
              id="Backend"
              name="tag_course"
              type="radio"
              value="BACKEND"
              checked={courseData.tag_course === 'BACKEND'}
              onChange={handleChange}
              title="Campo de tag do curso"
              required
            />
            <label className="ml-2 text-lg md:text-3xl" htmlFor="Backend">
              Backend
            </label>
          </div>
        </div>
        <div className="w-screen h-16 md:h-32 flex text-center justify-center items-center">
          <button
            className="w-1/3 md:h-2/3 h-4/6 bg-violet-700 text-xl md:text-4xl text-white rounded-md"
            type="submit"
            form="course-register-form"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  )
}
