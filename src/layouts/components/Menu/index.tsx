import {
  DashboardOutlined,
  DescriptionOutlined,
  EqualizerOutlined,
  PeopleOutlined,
  AdminPanelSettingsOutlined,
  CategoryOutlined,
  WarehouseOutlined,
} from '@mui/icons-material'
import classNames from 'classnames/bind'

import { Link, NavLink } from 'react-router-dom'
import { routes } from '../../../routes'
import images from '../../../assets/images'
import styles from './Menu.module.scss'
const cx = classNames.bind(styles)

console.log(styles)
function Menu() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('wrapper-logo')}>
        <img src={images.logo} alt="Logo" className={cx('logo')} />
      </div>
      <div style={{ height: 30 }}></div>
      <NavLink className={({ isActive }) => cx('item', isActive && 'active')} to={routes.user}>
        <PeopleOutlined sx={{ color: '#fff' }} />
        <div className={styles.text}>KHÁCH HÀNG</div>{' '}
      </NavLink>{' '}
      <NavLink className={({ isActive }) => cx('item', isActive && 'active')} to="/bill">
        <DescriptionOutlined sx={{ color: '#fff' }} />
        <div className={styles.text}>HÓA ĐƠN</div>{' '}
      </NavLink>{' '}
      <NavLink className={({ isActive }) => cx('item', isActive && 'active')} to="/staff">
        <AdminPanelSettingsOutlined sx={{ color: '#fff' }} />
        <div className={styles.text}>NHÂN VIÊN</div>{' '}
      </NavLink>{' '}
      <NavLink className={({ isActive }) => cx('item', isActive && 'active')} to="/product">
        <CategoryOutlined sx={{ color: '#fff' }} />
        <div className={styles.text}>SẢN PHẨM</div>{' '}
      </NavLink>{' '}
      <NavLink className={({ isActive }) => cx('item', isActive && 'active')} to="/warehouse">
        <WarehouseOutlined sx={{ color: '#fff' }} />
        <div className={styles.text}>NHẬP KHO</div>{' '}
      </NavLink>{' '}
      <NavLink className={({ isActive }) => cx('item', isActive && 'active')} to="/statistic">
        <EqualizerOutlined sx={{ color: '#fff' }} />
        <div className={styles.text}>THỐNG KÊ</div>{' '}
      </NavLink>
    </div>
  )
}

export default Menu
