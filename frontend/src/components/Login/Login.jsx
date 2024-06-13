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
    <div className="w-screen h-96 bg-white flex flex-col justify-center items-center bg-slate-600">
      <form
        className="w-5/6 h-1 flex flex-col justify-center items-center "
        id="login-form"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col text-left">
          <label className="text-white" htmlFor="email-login">
            Email
          </label>
          <input
            name="email-login"
            type="email"
            value={userData.email_user}
            onChange={(e) => setUserData(e.target.value)}
            title="Campo de email"
            required
          />
        </div>
        <div className="w-full flex flex-col text-left">
          <label className="text-white text-xl " htmlFor="password-login">
            Senha
          </label>
          <input
            name="password-login"
            type="password"
            value={userData.password_user}
            onChange={(e) => setUserData(e.target.value)}
            minLength="8"
            title="Campo de senha"
            required
          />
        </div>
      </form>
      <button className="w-full" type="submit" form="login-form">
        Login
      </button>
    </div>
  )
}
