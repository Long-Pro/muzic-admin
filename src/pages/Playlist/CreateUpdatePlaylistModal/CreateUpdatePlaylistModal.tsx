import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react'
import classNames from 'classnames/bind'
import { Button, TextField, Autocomplete } from '@mui/material'

import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { CustomizeModal } from '../../../components'
import images from '../../../assets/images'
import styles from './CreateUpdatePlaylistModal.module.scss'
import { createPlaylist, updateIsPublicPlaylist, updateNamePlaylist } from '../../../features/playlist/playlistSlice'
import { IPlaylist, IPlaylistCreate, IPlaylistUpdateName } from '../../../Interfaces/store/IPlaylist'
const cx = classNames.bind(styles)
interface IProp {
  playlist?: IPlaylist
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isUpdate: boolean
}

interface IErrorFormMessage {
  name: string
  isPublic: string
}
interface IAutocompleteOption {
  label: string
  isPublic: boolean
}
interface IFormValue {
  name: string
  isPublic: IAutocompleteOption | null
}

function CreateUpdatePlaylistModal({ playlist, open, setOpen, isUpdate }: IProp) {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState(isUpdate ? `Chỉnh sửa thông tin playlist ${playlist?.name}` : 'Thêm mới playlist')
  const [autocompleteOptions, setAutocompleteOptions] = useState<IAutocompleteOption[]>([
    { label: 'public', isPublic: true },
    { label: 'private', isPublic: false },
  ])
  const [formDataValue, setFormDataValue] = useState<IFormValue>({
    name: (isUpdate ? playlist?.name : '') as string,
    isPublic: playlist
      ? (autocompleteOptions.find((x) => x.isPublic === playlist?.isPublic) as IAutocompleteOption)
      : null,
  })

  useEffect(() => {
    setFormDataValue({
      name: (isUpdate ? playlist?.name : '') as string,
      isPublic: playlist
        ? (autocompleteOptions.find((x) => x.isPublic === playlist?.isPublic) as IAutocompleteOption)
        : null,
    })
    setTitle(isUpdate ? `Chỉnh sửa thông tin playlist ${playlist?.name}` : 'Thêm mới playlist')
  }, [playlist, open, isUpdate])
  const [formDataMessage, setFormDataMessage] = useState<IErrorFormMessage>({
    name: '',
    isPublic: '',
  })
  const changeIsPublicAutocomplete = (event: any, newValue: IAutocompleteOption | null) => {
    setFormDataValue({ ...formDataValue, isPublic: newValue })
  }
  const handleCreateArtist = () => {
    const { name, isPublic } = formDataValue
    const errorFormMessage: IErrorFormMessage = {
      name: name ? '' : 'Không hợp lệ',
      isPublic: isPublic ? '' : 'Vui lòng chọn',
    }
    setFormDataMessage({ ...errorFormMessage })
    if (Object.values(errorFormMessage).every((x) => x === '')) {
      dispatch(createPlaylist({ name, isPublic: isPublic?.isPublic } as IPlaylistCreate))
    }
  }
  const handleUpdateArtist = () => {
    const { name, isPublic } = formDataValue
    const errorFormMessage: IErrorFormMessage = {
      name: name ? '' : 'Không hợp lệ',
      isPublic: isPublic ? '' : 'Vui lòng chọn',
    }
    setFormDataMessage({ ...errorFormMessage })
    if (Object.values(errorFormMessage).every((x) => x === '')) {
      console.log('updateNamePlaylist')
      dispatch(
        updateNamePlaylist({
          name,
          playlistId: playlist?.playlistId as number,
        } as IPlaylistUpdateName),
      )
      if (playlist?.isPublic != isPublic?.isPublic) {
        console.log('updateIsPublicPlaylist')

        dispatch(updateIsPublicPlaylist(playlist?.playlistId as number))
      }
    }
  }
  return (
    <>
      <CustomizeModal open={open} setOpen={setOpen} title={title}>
        <div className={cx('field-wrapper')}>
          {isUpdate && (
            <TextField
              sx={{ width: '300px' }}
              label="Id"
              variant="outlined"
              value={playlist?.playlistId}
              margin="normal"
              InputProps={{ readOnly: true }}
            />
          )}
          <TextField
            error={!!formDataMessage.name}
            sx={{ width: '300px' }}
            label="Tên"
            variant="outlined"
            value={formDataValue.name}
            margin="normal"
            helperText={formDataMessage.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFormDataValue({ ...formDataValue, name: event.target.value })
            }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={autocompleteOptions}
            sx={{ width: '300px' }}
            value={formDataValue.isPublic}
            onChange={changeIsPublicAutocomplete}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                label="Trạng thái"
                error={!!formDataMessage.isPublic}
                helperText={formDataMessage.isPublic}
              />
            )}
          />
        </div>
        <div className="bottom-button-group">
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={isUpdate ? handleUpdateArtist : handleCreateArtist}
          >
            {isUpdate ? 'Chỉnh sửa' : 'Thêm'}
          </Button>
        </div>
      </CustomizeModal>
    </>
  )
}

export default CreateUpdatePlaylistModal
