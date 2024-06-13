import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { useState } from 'react'

export default function Login() {
  const [userData, setUserData] = useState({
    email_user: '',
    password_user: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevState) => ({ ...prevState, [name]: value }))
  }

  const notifySucess = (message) => {
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

      const response = await fetch('http://localhost:6777/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      const json = await response.json()

      console.log('\njson: ' + json.message + '\nstatus: ' + json.result)
      if (json.result === true) {
        notifySucess(json.message)
      }
      if (json.result === false) {
        notifyFailed(json.message || 'Email ou senha incorretos')
      }
    } catch (err) {
      console.error('erro' + err.stack)
      notifyFailed('Erro ao realizar o login.')
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
        className="w-5/6 h-80 bg-white flex flex-col justify-center items-center rounded-md"
        id="login-form"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-40 text-center flex justify-center items-center">
          <h1 className="text-4xl">Entrar</h1>
        </div>
        <div className="w-full flex flex-col text-left mb-2">
          <label
            className="text-whitetext-black text-xl ml-7 mb-1"
            htmlFor="email-login"
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
            htmlFor="password-login"
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
        <div className="w-full h-4/5 flex justify-center items-center">
          <button
            className="w-1/2 h-1/3 bg-violet-700 text-xl text-white rounded-md"
            type="submit"
            form="login-form"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
