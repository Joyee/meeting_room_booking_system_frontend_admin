import { Outlet, Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import './index.css'

export function Index() {
  return (
    <div className='index-container'>
      <div className='header'>
        <Link to='/' className='sys_name'>
          <h1>会议室预定系统-后台管理</h1>
        </Link>
        <Link to='/user/modify_profile'>
          <UserOutlined className='icon' />
        </Link>
      </div>
      <div className='body'>
        <Outlet />
      </div>
    </div>
  )
}
