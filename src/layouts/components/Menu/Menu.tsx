import { PeopleOutlined, LibraryMusic, MusicNote, Person } from '@mui/icons-material'
import classNames from 'classnames/bind'

import { Link, NavLink } from 'react-router-dom'
import { routes } from '../../../routes'
import images from '../../../assets/images'
import styles from './Menu.module.scss'
const cx = classNames.bind(styles)
function Menu() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('wrapper-logo')}>
        <img src={images.logo} alt="Logo" className={cx('logo')} />
      </div>
      <div style={{ height: 30 }}></div>
      <NavLink className={({ isActive }) => cx('item', isActive && 'active')} to={routes.user}>
        <PeopleOutlined sx={{ color: '#fff' }} />
        <div>KHÁCH HÀNG</div>
      </NavLink>
      <NavLink className={({ isActive }) => cx('item', isActive && 'active')} to={routes.song}>
        <MusicNote sx={{ color: '#fff' }} />
        <div>Bài hát</div>
      </NavLink>
      <NavLink className={({ isActive }) => cx('item', isActive && 'active')} to={routes.album}>
        <LibraryMusic sx={{ color: '#fff' }} />
        <div>Album</div>
      </NavLink>
      <NavLink className={({ isActive }) => cx('item', isActive && 'active')} to={routes.artist}>
        <Person sx={{ color: '#fff' }} />
        <div>Tác giả</div>
      </NavLink>
    </div>
  )
}

export default Menu
