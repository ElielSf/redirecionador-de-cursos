import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'

import App from './App.jsx'

import Home from './components/Home/Home.jsx'
import CourseRegister from './components/CourseRegister/CourseRegister.jsx'
import CourseControl from './components/CourseControl/CourseControl.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cursos/criar',
        element: <CourseRegister />,
      },
      {
        path: '/cursos/controlar',
        element: <CourseControl />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
