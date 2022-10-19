import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { Modal, Button } from '@mui/material'

import images from '../../../assets/images'
import styles from './CreateUpdateForm.module.scss'
const cx = classNames.bind(styles)
function CreateUpdateForm() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <Modal open={open} onClose={handleClose}>
      <div className={cx('wrapper')}>
        <h1>zzzzzzzzzzzzzzzzzzz</h1>
      </div>
    </Modal>
  )
}

export default CreateUpdateForm
