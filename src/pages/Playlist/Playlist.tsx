import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import images from '../../assets/images'
import styles from './Playlist.module.scss'
const cx = classNames.bind(styles)
function Playlist() {
  return (
    <div className={cx('wrapper')}>
      <h1>Playlist</h1>
    </div>
  )
}

export default Playlist
