import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent, useCallback } from 'react'
import classNames from 'classnames/bind'
import { Modal, Button, TextField, Autocomplete } from '@mui/material'

import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

import { CustomizeModal } from '../../../components'
import images from '../../../assets/images'
import styles from './DetailSongModal.module.scss'
import { ISong } from '../../../Interfaces/store/ISong'

const cx = classNames.bind(styles)

interface IProp {
  song: ISong
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

function DetailSongModal({ song, open, setOpen }: IProp) {
  const [title, setTitle] = useState(`Bài hát ${song?.name}`)

  return (
    <CustomizeModal open={open} setOpen={setOpen} title={title}>
      <div className={cx('field-wrapper')}>
        <AudioPlayer
          autoPlay
          src={song.link}
          onPlay={(e) => console.log('onPlay')}
          onListen={(e: any) => console.log(e.timeStamp)}
        />
      </div>
    </CustomizeModal>
  )
}

export default DetailSongModal
