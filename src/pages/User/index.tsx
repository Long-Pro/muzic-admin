import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import images from '../../assets/images'
import styles from './User.module.scss'
const cx = classNames.bind(styles)
function User() {
  return (
    <div className={cx('wrapper')}>
      <h1>User</h1>
    </div>
  )
}

export default User
