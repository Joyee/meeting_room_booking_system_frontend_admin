import { Outlet } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import './index.css'

export function Index() {
  return (
    <div className='index-container'>
      <div className='header'>
        <h1>会议室预定系统-后台管理</h1>
        <UserOutlined className='icon' />
      </div>
      <div className='body'>
        <Outlet />
      </div>
    </div>
  )
}
