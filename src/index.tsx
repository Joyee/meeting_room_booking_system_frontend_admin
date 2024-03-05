import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './index.css'
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import { Index } from './pages/index/Index'
import { ErrorPage } from './pages/error-page/ErrorPage'
import { UserManage } from './pages/user-manage/UserManage'
import { Login } from './pages/login/Login'
import { Menu } from './pages/menu/Menu'
import { ModifyMenu } from './pages/modify-menu/ModifyMenu'
import { ModifyProfile } from './pages/modify-profile/ModifyProfile'
import { ModifyPassword } from './pages/modify-password/ModifyPassword'
import { MeetingRoomManage } from './pages/meeting-room-manage/MeetingRoomManage'
import { BookingManage } from './pages/booking-manage/BookingMange'
import { Statistic } from './pages/statistic/Statistic'

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
            path: '/meeting_room_manage',
            element: <MeetingRoomManage />,
          },
          {
            path: '/booking_manage',
            element: <BookingManage />,
          },
          {
            path: '/statistic',
            element: <Statistic />,
          },
          {
            path: '/user_manage',
            element: <UserManage />,
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
root.render(
  <ConfigProvider locale={zhCN}>
    <RouterProvider router={router} />
  </ConfigProvider>,
)
