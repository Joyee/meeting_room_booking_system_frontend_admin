import { Outlet } from 'react-router-dom'
import { Menu as AntdMenu, type MenuProps } from 'antd'
import './menu.css'

export function Menu() {
  const items: MenuProps['items'] = [
    { key: '1', label: '会议室管理' },
    { key: '2', label: '预定管理' },
    { key: '3', label: '用户管理' },
    { key: '4', label: '统计' },
  ]

  return (
    <div className='menu-container'>
      <div className='menu-area'>
        <AntdMenu defaultSelectedKeys={['3']} items={items} />
      </div>
      <div className='content-area'>
        <Outlet />
      </div>
    </div>
  )
}
