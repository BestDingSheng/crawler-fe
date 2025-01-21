import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Layout } from '../components/layout/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      // 后续可以添加更多路由
      // {
      //   path: '/login',
      //   element: <Login />
      // },
      // {
      //   path: '/register',
      //   element: <Register />
      // }
    ]
  }
])

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />
} 