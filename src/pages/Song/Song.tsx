import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import images from '../../assets/images'
import styles from './Song.module.scss'
const cx = classNames.bind(styles)
function Song() {
  return (
    <div className={cx('wrapper')}>
      <h1>Song</h1>
    </div>
  )
}

export default Song
