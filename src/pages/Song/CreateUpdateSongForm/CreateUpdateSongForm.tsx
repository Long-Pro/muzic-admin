import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import classNames from 'classnames/bind'
import { Modal, Button, TextField, Autocomplete } from '@mui/material'

import { getAllArtist, artistStore } from '../../../features/artist/artistSlice'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { CustomizeModal } from '../../../components'
import images from '../../../assets/images'
import styles from './CreateUpdateSongForm.module.scss'
import { ISong, ISongCreate, ISongUpdate } from '../../../Interfaces/store/ISong'
import { IArtist } from '../../../Interfaces/store/IArtist'
import { CommonHelper } from '../../../utils/CommonHelper'
import { EStatusState, ETypeState } from '../../../constants/common'
const cx = classNames.bind(styles)
interface IProp {
  song?: ISong
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

function CreateUpdateSongForm({ song, open, setOpen }: IProp) {
  const dispatch = useAppDispatch()
  setInterval(() => {
    console.log(dataForm)
  }, 3000)
  const { status: artistStoreStatus, value: artistStoreValue, type: artistStoreType } = useAppSelector(artistStore)
  console.log(artistStoreValue)

  const [artists, setArtists] = useState<IArtist[]>([])
  useEffect(() => {
    dispatch(getAllArtist())
  }, [])
  useEffect(() => {
    if (artistStoreType === ETypeState.Get) {
      switch (artistStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Lấy dữ liệu thất bại`)
          break
        case EStatusState.Success:
          setArtists(artistStoreValue)
          break
      }
    }
  }, [artistStoreValue, artistStoreStatus, artistStoreType])

  const [isUpdate, setIsUpdate] = useState<boolean>(!!song)
  const [title, setTitle] = useState(isUpdate ? `Chỉnh sửa bài hát ${song?.name}` : 'Thêm mới bài hát')
  const [dataForm, setDataForm] = useState<ISongCreate | ISongUpdate>(() => {
    return isUpdate ? ({ ...song } as ISong) : {}
  })

  const changeArtistAutocomplete = (event: any, newValue: IArtist | null) => {
    dataForm.artistId = newValue?.id
  }
  return (
    <CustomizeModal open={open} setOpen={setOpen} title={title}>
      <TextField
        sx={{ width: '300px' }}
        label="Id"
        variant="outlined"
        value={dataForm.name}
        margin="normal"
        // InputProps={{ readOnly: !isUpdate }}
      />
      <TextField sx={{ width: '300px' }} label="Quốc gia" variant="outlined" value={dataForm.country} margin="normal" />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        getOptionLabel={(x) => x.name}
        options={artists}
        sx={{ width: '300px' }}
        //value={dataForm.artistId as string}
        onChange={changeArtistAutocomplete}
        renderInput={(params) => <TextField {...params} margin="normal" label="Ca sĩ" />} //{label={filter=='phone'?'SDT':'ID'}}
      />
    </CustomizeModal>
    // <Modal open={open} onClose={() => setOpen(false)}>
    //   <div className="modal-wrapper" style={{ width: '60%' }}>
    //     <div className="title-wrapper">
    //       <h3 className="title">Thông tin bài hát {song?.name}</h3>
    //       <Close onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} />
    //     </div>
    //     <div className="content">
    //       <TextField
    //         sx={{ width: '300px' }}
    //         label="Id"
    //         variant="outlined"
    //         value={songId}
    //         margin="normal"
    //         InputProps={{ readOnly: true }}
    //       />
    //       <TextField
    //         sx={{ width: '300px' }}
    //         label="Tên"
    //         variant="outlined"
    //         value={name}
    //         margin="normal"
    //         InputProps={{ readOnly: true }}
    //       />
    //       <TextField
    //         sx={{ width: '300px' }}
    //         label="Code"
    //         variant="outlined"
    //         value={code}
    //         margin="normal"
    //         InputProps={{ readOnly: true }}
    //       />
    //       <TextField
    //         sx={{ width: '300px' }}
    //         label="Lượt nghe"
    //         variant="outlined"
    //         value={total_listen}
    //         margin="normal"
    //         InputProps={{ readOnly: true }}
    //       />
    //       <TextField
    //         sx={{ width: '300px' }}
    //         label="Quốc gia"
    //         variant="outlined"
    //         value={country}
    //         margin="normal"
    //         InputProps={{ readOnly: true }}
    //       />
    //       <TextField
    //         sx={{ width: '300px' }}
    //         label="Ca sĩ"
    //         variant="outlined"
    //         value={artistName}
    //         margin="normal"
    //         InputProps={{ readOnly: true }}
    //       />
    //     </div>
    //     {/* <div className="delete-button-group">
    //       <Button size="small" variant="contained" color="warning" onClick={() => setOpen(false)}>
    //         Thoát
    //       </Button>
    //     </div> */}
    //   </div>
    // </Modal>
  )
}

export default CreateUpdateSongForm
