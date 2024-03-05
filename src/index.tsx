import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import { Index } from './pages/index/Index'
import { ErrorPage } from './pages/error-page/ErrorPage'
import { UserManager } from './pages/user-manager/UserManager'
import { Login } from './pages/login/Login'
import { Menu } from './pages/menu/Menu'
import { ModifyMenu } from './pages/modify-menu/ModifyMenu'
import { ModifyProfile } from './pages/modify-profile/ModifyProfile'
import { ModifyPassword } from './pages/modify-password/ModifyPassword'

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
      {
        path: '/user',
        element: <ModifyMenu />,
        children: [
          {
            path: 'modify_profile',
            element: <ModifyProfile />,
          },
          {
            path: 'modify_password',
            element: <ModifyPassword />,
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
export const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<RouterProvider router={router} />)
