import { Link } from 'react-router-dom'

export default function Authentication() {
  return (
    <div className="w-screen h-5/6  pt-8 pb-8 flex flex-col justify-self-center items-center">
      <div className="w-4/5 h-3/5 flex flex-col justify-center text-center bg-white rounded-md">
        <h1 className="h-2/5 text-4xl mt-4 pt-10">Seja bem vindo.</h1>
        <div className="w-screen h-4/5 self-center flex flex-col justify-center items-center mt-5">
          <Link
            to="/cadastro"
            className="w-2/4 h-12 flex flex-col justify-center text-center text-2xl text-white m-2 bg-violet-700 rounded-md"
          >
            Cadastrar-se
          </Link>
          <Link
            to="/login"
            className="w-2/4 h-12 flex flex-col justify-center text-center text-2xl text-white m-2 bg-violet-700 rounded-md"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
