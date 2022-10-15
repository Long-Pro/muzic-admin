import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import images from '../../assets/images'
import styles from './Album.module.scss'
const cx = classNames.bind(styles)
function Album() {
  return (
    <div className={cx('wrapper')}>
      <h1>Album</h1>
    </div>
  )
}

export default Album
