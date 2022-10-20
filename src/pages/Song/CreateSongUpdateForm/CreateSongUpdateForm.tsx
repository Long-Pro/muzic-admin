import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { Modal, Button } from '@mui/material'

import images from '../../../assets/images'
import styles from './CreateSongUpdateForm.module.scss'
import { ISong } from '../../../Interfaces/base/ISong'
const cx = classNames.bind(styles)
interface IProp {
  isCreate?: boolean
  song?: ISong
}

function CreateSongUpdateForm({ isCreate, song }: IProp) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <Modal open={open} onClose={handleClose}>
      <div className={cx('wrapper')}>
        <h2>{isCreate ? 'Thêm mới bài hát' : 'Chỉnh sửa bài hát'}</h2>
      </div>
    </Modal>
  )
}

export default CreateSongUpdateForm
