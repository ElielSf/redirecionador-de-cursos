import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { useState } from 'react'

export default function Register() {
  const [userData, setUserData] = useState({
    name_user: '',
    email_user: '',
    password_user: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevState) => ({ ...prevState, [name]: value }))
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
      console.log(userData)

      const response = await fetch('http://localhost:6777/registro', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      const json = await response.json()

      console.log('\nJson: ' + json.message + '\nStatus: ' + json.result)
      if (json.result && json.result === true) {
        notifySuccess(json.message)
      } else {
        notifyFailed(json.message || 'Erro no cadastro, verifique os campos.')
      }
    } catch (err) {
      console.error('erro: ' + err.stack)
      notifyFailed('Erro ao realizar o cadastro.')
    }
  }

  return (
    <div className="w-screen h-auto pt-8 pb-8 flex flex-col justify-self-center justify-center items-center">
      <ToastContainer
        position="botton-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <form
        className="w-5/6 h-96 bg-white flex flex-col justify-center items-center rounded-md"
        id="register-form"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-40 text-center flex justify-center items-center">
          <h1 className="text-4xl">Cadastro</h1>
        </div>
        <div className="w-full flex flex-col text-left mb-2">
          <label
            className="text-whitetext-black text-xl ml-7 mb-1"
            htmlFor="name_user"
          >
            Nome de usuário
          </label>
          <input
            className="border-slate-500 border-2 w-5/6 place-self-center rounded-md pl-1"
            name="name_user"
            type="text"
            value={userData.name_user}
            onChange={handleChange}
            title="Campo de nome de usuário"
            minLength="2"
            required
          />
        </div>
        <div className="w-full flex flex-col text-left mb-2">
          <label
            className="text-whitetext-black text-xl ml-7 mb-1"
            htmlFor="email_user"
          >
            Email
          </label>
          <input
            className="border-slate-500 border-2 w-5/6 place-self-center rounded-md pl-1"
            name="email_user"
            type="email"
            value={userData.email_user}
            onChange={handleChange}
            title="Campo de email"
            required
          />
        </div>
        <div className="w-full flex flex-col text-left">
          <label
            className="text-black text-xl ml-7 mb-1"
            htmlFor="password_user"
          >
            Senha
          </label>
          <input
            className="border-slate-500 border-2 w-5/6 place-self-center rounded-md pl-1"
            name="password_user"
            type="password"
            value={userData.password_user}
            onChange={handleChange}
            minLength="8"
            title="Campo de senha"
            required
          />
        </div>
        <div className="w-full h-3/5 flex justify-center items-center">
          <button
            className="w-1/2 h-1/3 bg-violet-700 text-xl text-white rounded-md"
            type="submit"
            form="register-form"
          >
            Cadastro
          </button>
        </div>
      </form>
    </div>
  )
}
