import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import Authentication from './components/Authentication/Authentication.jsx'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'

import Home from './components/Home/Home.jsx'

import './css/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Authentication />,
      },
      {
        path: '/cadastro',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/perfil',
        // element: <Profile />,
      },
      {
        path: '/cursos',
        element: <Home />,
      },
      {
        path: '/contato',
        // element: <Contact />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
