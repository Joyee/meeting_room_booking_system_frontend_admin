import { Menu, type MenuProps } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import './menu.css'
import { MenuClickEventHandler } from 'rc-menu/lib/interface'
import { router } from '../..'

export function ModifyMenu() {
  const location = useLocation()

  const items: MenuProps['items'] = [
    { key: '1', label: '信息修改' },
    { key: '2', label: '密码修改' },
  ]

  const handleMenuItemClick: MenuClickEventHandler = (item) => {
    if (item.key === '1') {
      router.navigate('/user/modify_profile')
    } else if (item.key === '2') {
      router.navigate('/user/modify_password')
    }
  }

  return (
    <div className='menu-container'>
      <div className='menu-area'>
        <Menu
          defaultSelectedKeys={location.pathname === '/user/modify_profile' ? ['1'] : ['2']}
          items={items}
          onClick={handleMenuItemClick}
        />
      </div>
      <div className='content-area'>
        <Outlet />
      </div>
    </div>
  )
}
