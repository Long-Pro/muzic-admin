import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import images from '../../assets/images'
import styles from './New.module.scss'
const cx = classNames.bind(styles)
function New() {
  return (
    <div className={cx('wrapper')}>
      <h1>New</h1>
    </div>
  )
}

export default New
