import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [courseData, setCourseData] = useState([])

  useEffect(() => {
    const dataCourses = async () => {
      try {
        const response = await fetch('http://localhost:6777/cursos', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        })
        const json = await response.json()
        setCourseData(json.result)
      } catch (err) {
        console.error('erro: ' + err.stack)
      }
    }
    dataCourses()
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col">
      <h1 className="w-screen h-auto pt-5 pb-4 text-2xl text-center md:text-5xl md:mt-5 md:mb-5">
        <strong>Seja bem vindo...</strong>
      </h1>
      <h2 className="w-screen ml-2 mb-2 mt-2 text-lg md:text-4xl md:mb-8 text-violet-700">
        <strong>Cursos Cadastrados:</strong>
      </h2>
      <div>
        {courseData.length > 0 ? (
          courseData.map((courseData) => {
            return (
              <Link
                className="w-full h-14 md:h-24 flex border-slate-900 bg-slate-700 hover:bg-slate-900 text-white"
                to="/cursos/controlar"
                state={courseData}
                key={courseData.id_course}
              >
                <div className="w-full h-14 md:h-24 flex border-b-4 border-slate-900 bg-slate-700 hover:bg-slate-900 text-white">
                  <div className="w-10 md:w-12 h-full p-2 flex items-center justify-center overflow-auto">
                    <h2 className="md:text-3xl">{courseData.id_course}</h2>
                  </div>
                  <div className="w-1/2 h-full p-2 flex items-center border-l-2 border-slate-900 overflow-auto">
                    <h2 className="md:text-3xl">{courseData.name_course}</h2>
                  </div>
                  <div className="w-auto h-full p-2 flex items-center border-l-2 border-slate-900">
                    <h2 className="md:text-3xl">{courseData.tag_course}</h2>
                  </div>
                </div>
              </Link>
            )
          })
        ) : (
          <div className="w-screen mb-2 mt-5 text-lg">
            <h2>Nenhum curso cadastrado.</h2>
          </div>
        )}
      </div>
    </div>
  )
}
