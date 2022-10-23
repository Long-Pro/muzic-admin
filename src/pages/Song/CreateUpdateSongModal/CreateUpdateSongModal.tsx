import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react'
import classNames from 'classnames/bind'
import { Modal, Button, TextField, Autocomplete } from '@mui/material'

import { getAllArtist, artistStore } from '../../../features/artist/artistSlice'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { CustomizeModal } from '../../../components'
import images from '../../../assets/images'
import styles from './CreateUpdateSongModal.module.scss'
import { ISong, ISongCreate, ISongUpdate } from '../../../Interfaces/store/ISong'
import { IArtist } from '../../../Interfaces/store/IArtist'
import { CommonHelper } from '../../../utils/CommonHelper'
import { EStatusState, ETypeState } from '../../../constants/common'
import { createSong, updateSong } from '../../../features/song/songSlice'
const cx = classNames.bind(styles)

interface IProp {
  song?: ISong
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isUpdate: boolean
}
interface IErroFormMessage {
  name: string
  country: string
  artist: string
  lyric?: string
  musicFile?: string
  thumbnail?: string
}
interface IFormValue {
  name: string
  country: string
  artist?: IArtist | null
  code?: string

  lyric?: any
  musicFile?: any
  thumbnail?: any
}

function CreateUpdateSongModal({ song, open, setOpen, isUpdate }: IProp) {
  const dispatch = useAppDispatch()

  const { status: artistStoreStatus, value: artistStoreValue, type: artistStoreType } = useAppSelector(artistStore)
  useEffect(() => {
    if (artistStoreType === ETypeState.Get) {
      switch (artistStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Lấy dữ liệu thất bại`)
          break
        case EStatusState.Success:
          break
      }
    }
  }, [artistStoreValue, artistStoreStatus, artistStoreType])
  useEffect(() => {
    dispatch(getAllArtist())
  }, [])

  const [title, setTitle] = useState(isUpdate ? `Chỉnh sửa thông tin bài hát ${song?.name}` : 'Thêm mới bài hát')
  const [formDataValue, setFormDataValue] = useState<IFormValue>({
    name: (isUpdate ? song?.name : '') as string,
    code: isUpdate ? song?.code : '',
    country: (isUpdate ? song?.country : '') as string,
    artist: isUpdate ? artistStoreValue.find((x) => x.id === song?.artistId) : null,

    lyric: null,
    musicFile: null,
    thumbnail: null,
  })
  useEffect(() => {
    setTitle(isUpdate ? `Chỉnh sửa thông tin bài hát ${song?.name}` : 'Thêm mới bài hát')

    setFormDataValue({
      name: (isUpdate ? song?.name : '') as string,
      code: isUpdate ? song?.code : '',
      country: (isUpdate ? song?.country : '') as string,
      artist: isUpdate ? artistStoreValue.find((x: IArtist) => x.id === song?.artistId) : null,

      lyric: null,
      musicFile: null,
      thumbnail: null,
    })
  }, [song, open, isUpdate])
  const [formDataMessage, setFormDataMessage] = useState<IErroFormMessage>({
    name: '',
    country: '',
    artist: '',
    lyric: '',
    musicFile: '',
    thumbnail: '',
  })
  const changeArtistAutocomplete = (event: any, newValue: IArtist | null) => {
    formDataValue.artist = newValue
  }
  const handleCreateSong = () => {
    const { name, country, artist, code, lyric, musicFile, thumbnail } = formDataValue
    console.log(formDataValue)

    const errorFormMessage: IErroFormMessage = {
      name: name ? '' : 'Không hợp lệ',
      country: country ? '' : 'Không hợp lệ',
      artist: artist ? '' : 'Vui lòng chọn',
      musicFile: musicFile ? '' : 'Vui lòng chọn',
      lyric: lyric ? '' : 'Vui lòng chọn',
      thumbnail: thumbnail ? '' : 'Vui lòng chọn',
    }
    console.log(errorFormMessage)

    setFormDataMessage({ ...errorFormMessage })
    if (Object.values(errorFormMessage).every((x) => x === '')) {
      dispatch(createSong({ country, name, code, artistId: artist?.id as number, musicFile, lyric, thumbnail }))
    }
  }
  const handleUpdateSong = () => {
    const { name, country, artist, code, lyric, musicFile, thumbnail } = formDataValue
    const errorFormMessage: IErroFormMessage = {
      name: name ? '' : 'Không hợp lệ',
      country: country ? '' : 'Không hợp lệ',
      artist: artist ? '' : 'Vui lòng chọn',
    }
    setFormDataMessage({ ...errorFormMessage })
    if (Object.values(errorFormMessage).every((x) => x === '')) {
      const data: ISongUpdate = { id: song?.songId as number, country, name, code, artistId: artist?.id as number }
      if (musicFile) data.musicFile = musicFile
      if (lyric) data.lyric = lyric
      if (thumbnail) data.thumbnail = thumbnail

      dispatch(updateSong(data))
    }
  }
  const chooseFile = (e: any) => {
    const key = e.target.dataset['key']
    setFormDataValue({ ...formDataValue, [key]: e.target.files[0] })
  }

  return (
    <CustomizeModal open={open} setOpen={setOpen} title={title}>
      <div className={cx('field-wrapper')}>
        {isUpdate && (
          <TextField
            sx={{ width: '300px' }}
            label="Id"
            variant="outlined"
            value={song?.songId}
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        )}
        <TextField
          error={!!formDataMessage.name}
          helperText={formDataMessage.name}
          sx={{ width: '300px' }}
          label="Tên bài hát"
          variant="outlined"
          value={formDataValue.name}
          margin="normal"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFormDataValue({ ...formDataValue, name: event.target.value })
          }}
        />
        <TextField
          sx={{ width: '300px' }}
          label="Code"
          variant="outlined"
          value={formDataValue.code}
          margin="normal"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFormDataValue({ ...formDataValue, code: event.target.value })
          }}
        />
        <TextField
          error={!!formDataMessage.country}
          helperText={formDataMessage.country}
          sx={{ width: '300px' }}
          label="Quốc gia"
          variant="outlined"
          value={formDataValue.country}
          margin="normal"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFormDataValue({ ...formDataValue, country: event.target.value })
          }}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          getOptionLabel={(x) => x._label as string}
          options={artistStoreValue}
          sx={{ width: '300px' }}
          value={formDataValue.artist}
          onChange={changeArtistAutocomplete}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              label="Ca sĩ"
              error={!!formDataMessage.artist}
              helperText={formDataMessage.artist}
            />
          )}
        />
      </div>
      <div className={cx('button-group')}>
        <div className={cx('button-wrapper')}>
          <Button variant="contained" component="label" sx={{ width: '160px' }}>
            File music (.mp3)
            <input hidden accept=".mp3" multiple type="file" onChange={chooseFile} data-key="musicFile" />
          </Button>
          {!isUpdate && formDataMessage.musicFile && (
            <p className="danger-color error-form-text">{formDataMessage.musicFile}</p>
          )}
          <p>{formDataValue?.musicFile?.name}</p>
        </div>
        <div className={cx('button-wrapper')}>
          <Button variant="contained" component="label" onChange={chooseFile} sx={{ width: '160px' }}>
            File lyric (.lrc)
            <input hidden accept=".lrc" multiple type="file" onChange={chooseFile} data-key="lyric" />
          </Button>
          {!isUpdate && formDataMessage.musicFile && (
            <p className="danger-color error-form-text">{formDataMessage.lyric}</p>
          )}
          <p>{formDataValue.lyric?.name}</p>
        </div>
        <div className={cx('button-wrapper')}>
          <Button variant="contained" component="label" sx={{ width: '160px' }}>
            File thumbnail
            <input hidden accept="image/*" multiple type="file" onChange={chooseFile} data-key="thumbnail" />
          </Button>
          {!isUpdate && formDataMessage.musicFile && (
            <p className="danger-color error-form-text">{formDataMessage.thumbnail}</p>
          )}
          <p>{formDataValue.thumbnail?.name}</p>
        </div>
      </div>
      <div className="bottom-button-group">
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={isUpdate ? handleUpdateSong : handleCreateSong}
        >
          {isUpdate ? 'Chỉnh sửa' : 'Thêm'}
        </Button>
      </div>
    </CustomizeModal>
  )
}

export default CreateUpdateSongModal
