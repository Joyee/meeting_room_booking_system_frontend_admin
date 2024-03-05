import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import { Index } from './pages/index/Index'
import { ErrorPage } from './pages/error-page/ErrorPage'
import { UserManager } from './pages/user-manager/UserManager'
import { Login } from './pages/login/Login'
import { Menu } from './pages/menu/Menu'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Menu />,
        children: [
          {
            path: '/user_manager',
            element: <UserManager />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]
const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<RouterProvider router={router} />)
