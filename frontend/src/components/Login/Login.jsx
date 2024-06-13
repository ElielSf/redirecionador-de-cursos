import { useState } from 'react'

export default function Login() {
  const [userData, setUserData] = useState({
    email_user: '',
    password_user: '',
  })

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-type': 'aplication/json',
        },
        body: JSON.stringify(userData),
      })
      const json = await response.json

      console.log('response: ' + response + '\njson: ' + json)
    } catch (err) {
      console.error(err)
    }
  }

  return (
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
          className="border-slate-500 border-2border-black border-2 w-5/6 place-self-center rounded-md pl-1"
          name="email-login"
          type="email"
          value={userData.email_user}
          onChange={(e) => setUserData(e.target.value)}
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
          className="border-slate-500 border-2 w-5/6 place-self-center rounded-md"
          name="password-login"
          type="password"
          value={userData.password_user}
          onChange={(e) => setUserData(e.target.value)}
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
  )
}
