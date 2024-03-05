import { Outlet, useLocation } from 'react-router-dom'
import { Menu as AntdMenu, type MenuProps } from 'antd'
import './menu.css'
import { useCallback, useEffect } from 'react'
import { MenuClickEventHandler } from 'rc-menu/lib/interface'
import { router } from '../..'

export function Menu() {
  const location = useLocation()

  const items: MenuProps['items'] = [
    { key: '1', label: '会议室管理' },
    { key: '2', label: '预定管理' },
    { key: '3', label: '用户管理' },
    { key: '4', label: '统计' },
  ]

  const handleMenuItemClick: MenuClickEventHandler = useCallback((item) => {
    let path = ''
    switch (item.key) {
      case '1':
        path = '/meeting_room_manage'
        break
      case '2':
        path = '/booking_manage'
        break
      case '3':
        path = '/user_manage'
        break
      case '4':
        path = '/statistic'
        break
    }
    router.navigate(path)
  }, [])

  function getSelectedKeys() {
    if (location.pathname === '/meeting_room_manage') {
      return ['1']
    } else if (location.pathname === '/booking_manage') {
      return ['2']
    } else if (location.pathname === '/user_manage') {
      return ['3']
    } else if (location.pathname === '/statistic') {
      return ['4']
    } else {
      return ['1']
    }
  }

  return (
    <div className='menu-container'>
      <div className='menu-area'>
        <AntdMenu defaultSelectedKeys={getSelectedKeys()} items={items} onClick={handleMenuItemClick} />
      </div>
      <div className='content-area'>
        <Outlet />
      </div>
    </div>
  )
}
