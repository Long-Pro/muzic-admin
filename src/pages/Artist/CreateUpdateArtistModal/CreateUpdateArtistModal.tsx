import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react'
import classNames from 'classnames/bind'
import { Button, TextField, Autocomplete } from '@mui/material'

import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { CustomizeModal } from '../../../components'
import images from '../../../assets/images'
import styles from './CreateUpdateArtistModal.module.scss'
import { createArtist, updateArtist } from '../../../features/artist/artistSlice'
import { IArtist, IArtistCreate } from '../../../Interfaces/store/IArtist'
const cx = classNames.bind(styles)
interface IProp {
  artist?: IArtist
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isUpdate: boolean
}

interface IErroFormMessage {
  name: string
}

function CreateUpdateArtistModal({ artist, open, setOpen, isUpdate }: IProp) {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState(isUpdate ? `Chỉnh sửa thông tin ca sĩ ${artist?.name}` : 'Thêm mới ca sĩ')
  const [formDataValue, setFormDataValue] = useState<IArtistCreate>({
    name: (isUpdate ? artist?.name : '') as string,
    code: isUpdate ? artist?.code : '',
  })
  useEffect(() => {
    setFormDataValue({ name: (isUpdate ? artist?.name : '') as string, code: isUpdate ? artist?.code : '' })
  }, [artist, open, isUpdate])
  const [formDataMessage, setFormDataMessage] = useState<IErroFormMessage>({
    name: '',
  })

  const handleCreateArtist = () => {
    const { name, code } = formDataValue
    const errorFormMessage: IErroFormMessage = {
      name: name ? '' : 'Không hợp lệ',
    }
    setFormDataMessage({ ...errorFormMessage })
    if (Object.values(errorFormMessage).every((x) => x === '')) {
      dispatch(createArtist(formDataValue))
    }
  }
  const handleUpdateArtist = () => {
    const { name, code } = formDataValue
    const errorFormMessage: IErroFormMessage = {
      name: name ? '' : 'Không hợp lệ',
    }
    setFormDataMessage({ ...errorFormMessage })
    if (Object.values(errorFormMessage).every((x) => x === '')) {
      dispatch(updateArtist({ ...formDataValue, artistId: artist?.id as number }))
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
              value={artist?.id}
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

export default CreateUpdateArtistModal
