import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import classNames from 'classnames/bind'
import { Modal, Button, TextField, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

import images from '../../../assets/images'
import styles from './SongDetail.module.scss'
import { ISong } from '../../../Interfaces/base/ISong'
const cx = classNames.bind(styles)
interface IProp {
  song: ISong
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

function SongDetail({ song, open, setOpen }: IProp) {
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const {
    createdDate,
    updatedDate,
    isDeleted,
    songId,
    name,
    code,
    link,
    lyric,
    thumbnail,
    total_listen,
    country,
    artistName,
    isLiked,
  } = song
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="modal-wrapper" style={{ width: '60%' }}>
        <div className="title-wrapper">
          <h3 className="title">Thông tin bài hát {song?.name}</h3>
          <Close onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} />
        </div>
        <div className="content">
          <TextField
            sx={{ width: '300px' }}
            label="Id"
            variant="outlined"
            value={songId}
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            sx={{ width: '300px' }}
            label="Tên"
            variant="outlined"
            value={name}
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            sx={{ width: '300px' }}
            label="Code"
            variant="outlined"
            value={code}
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            sx={{ width: '300px' }}
            label="Lượt nghe"
            variant="outlined"
            value={total_listen}
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            sx={{ width: '300px' }}
            label="Quốc gia"
            variant="outlined"
            value={country}
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            sx={{ width: '300px' }}
            label="Ca sĩ"
            variant="outlined"
            value={artistName}
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </div>
        {/* <div className="delete-button-group">
          <Button size="small" variant="contained" color="warning" onClick={() => setOpen(false)}>
            Thoát
          </Button>
        </div> */}
      </div>
    </Modal>
  )
}

export default SongDetail
