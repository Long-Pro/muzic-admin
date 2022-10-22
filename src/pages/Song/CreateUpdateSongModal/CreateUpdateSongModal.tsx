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
}
interface IFormValue {
  name: string
  country: string
  artist?: IArtist | null
  code?: string

  lyric: any
  musicFile: any
  thumbnail: any
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
    setFormDataValue({
      name: (isUpdate ? song?.name : '') as string,
      code: isUpdate ? song?.code : '',
      country: (isUpdate ? song?.country : '') as string,
      artist: isUpdate ? artistStoreValue.find((x) => x.id === song?.artistId) : null,

      lyric: null,
      musicFile: null,
      thumbnail: null,
    })
  }, [song, open, isUpdate])
  const [formDataMessage, setFormDataMessage] = useState<IErroFormMessage>({
    name: '',
    country: '',
    artist: '',
  })
  const changeArtistAutocomplete = (event: any, newValue: IArtist | null) => {
    formDataValue.artist = newValue
  }
  const handleCreateSong = () => {
    const { name, country, artist } = formDataValue
    console.log(formDataValue)

    const errorFormMessage: IErroFormMessage = {
      name: name ? '' : 'Không hợp lệ',
      country: country ? '' : 'Không hợp lệ',
      artist: artist ? '' : 'Vui lòng chọn',
    }
    console.log(errorFormMessage)

    setFormDataMessage({ ...errorFormMessage })
    if (Object.values(errorFormMessage).every((x) => x === '')) {
      dispatch(createSong(formDataValue))
    }
  }
  const handleUpdateSong = () => {
    const { name, country, artist } = formDataValue
    const errorFormMessage: IErroFormMessage = {
      name: name ? '' : 'Không hợp lệ',
      country: country ? '' : 'Không hợp lệ',
      artist: artist ? '' : 'Vui lòng chọn',
    }
    setFormDataMessage({ ...errorFormMessage })
    if (Object.values(errorFormMessage).every((x) => x === '')) {
      dispatch(
        updateSong({ ...formDataValue, id: song?.songId as number, artistId: formDataValue.artist?.id as number }),
      )
    }
  }
  const chooseFile = (e: any) => {
    setFormDataValue({ ...formDataValue, musicFile: e.target.files[0] })
    const formData = new FormData()
    formData.append('thumbnail', e.target.files[0])
    formData.append('name', '000')
    formData.append('country', '000')
    formData.append('artistId', '585')
    dispatch(createSong(formDataValue))
  }

  return (
    <CustomizeModal open={open} setOpen={setOpen} title={title}>
      <div className={cx('field-wrapper')}>
        {/* {isUpdate && (
          <TextField
            sx={{ width: '300px' }}
            label="Id"
            variant="outlined"
            value={artist?.id}
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        )} */}
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
          getOptionLabel={(x) => x.name}
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
        <Button variant="contained" component="label" sx={{ width: '160px' }}>
          File music (.mp3)
          <input hidden accept=".mp3" multiple type="file" onChange={chooseFile} data-key="musicFile" />
        </Button>
        <Button variant="contained" component="label" onChange={chooseFile} sx={{ width: '160px' }}>
          File lyric (.lrc)
          <input hidden accept="image/*" multiple type="file" onChange={chooseFile} data-key="lyric" />
        </Button>
        <Button variant="contained" component="label" sx={{ width: '160px' }}>
          File thumbnail
          <input hidden accept="image/*" multiple type="file" onChange={chooseFile} data-key="thumbnail" />
        </Button>
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
