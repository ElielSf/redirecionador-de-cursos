import { useState, useEffect } from 'react'

export default function Home() {
  // const [uxData, setUxData] = useState({})
  // const [webData, setWebData] = useState({})
  // const [backendData, setBackendData] = useState({})

  useEffect(() => {
    dataCourses()
  }, [])

  const dataCourses = async () => {
    try {
      const response = fetch('http://localhost:6777/cursos', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      const json = await response.json()
      console.log(json)
    } catch (err) {
      console.error('erro: ' + err.stack)
    }
  }

  return (
    <div>
      <h1>a</h1>
    </div>
  )
}
