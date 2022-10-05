import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import images from '../../assets/images'
import styles from './Artist.module.scss'
const cx = classNames.bind(styles)
function Artist() {
  return (
    <div className={cx('wrapper')}>
      <h1>Artist</h1>
    </div>
  )
}

export default Artist
