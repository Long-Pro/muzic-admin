import { Outlet } from 'react-router-dom'
import { Header, Menu } from '../components'
import classNames from 'classnames/bind'

import images from '../../assets/images'
import styles from './MainLayout.module.scss'
const cx = classNames.bind(styles)
function MainLayout({ children }: { children: JSX.Element }) {
  return (
    <div style={{ display: 'flex' }}>
      <Menu />
      <div style={{ flex: 1 }}>
        <Header />
        <div className={cx('content')}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
