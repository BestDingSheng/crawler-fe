import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from '../pages/Home'
import { CourseDetail } from '../pages/CourseDetail'
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
      {
        path: '/course/:pageId',
        element: <CourseDetail />
      }
    ]
  }
])

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />
}