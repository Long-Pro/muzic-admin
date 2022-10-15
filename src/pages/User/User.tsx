import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import { updateHeaderTitle } from '../../features/app/appSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import images from '../../assets/images'
import styles from './User.module.scss'
const cx = classNames.bind(styles)
function User() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log('uuuuuuuuuuu')

    dispatch(updateHeaderTitle('NGƯỜI DÙNG'))
  }, [])
  return (
    <div className={cx('wrapper')}>
      <h1>User</h1>
    </div>
  )
}

export default User
