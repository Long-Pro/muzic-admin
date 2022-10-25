import { useState, useEffect, ChangeEvent } from 'react'
import classNames from 'classnames/bind'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'

import { updateHeaderTitle } from '../../features/app/appSlice'
import { getAllSong, toggleIsDeleteSong, songStore, resetStatus } from '../../features/song/songSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { CommonHelper } from '../../utils/CommonHelper'
import images from '../../assets/images'
import styles from './Song.module.scss'
import { ISong } from '../../Interfaces/store/ISong'
import { ETypeState, EStatusState, TypeToggleIsDeleteModal } from '../../constants/common'
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  IconButton,
  Switch,
} from '@mui/material'
import { Visibility, Edit, Delete } from '@mui/icons-material'
import CreateUpdateSongModal from './CreateUpdateSongModal/CreateUpdateSongModal'
import { CustomizeModal } from '../../components'
const cx = classNames.bind(styles)
function Song() {
  const dispatch = useAppDispatch()

  const { status: songStoreStatus, value: songStoreValue, type: songStoreType } = useAppSelector(songStore)

  useEffect(() => {
    dispatch(updateHeaderTitle('BÀI HÁT'))
    dispatch(getAllSong())
  }, [])
  useEffect(() => {
    if (songStoreType === ETypeState.Get) {
      switch (songStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Lấy dữ liệu thất bại`)
          break
        case EStatusState.Success:
          dispatch(resetStatus())
          break
      }
    }
    if (songStoreType === ETypeState.Create) {
      switch (songStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Thêm bài hát thất bại`)
          break
        case EStatusState.Success:
          setOpenCreateUpdateModal(false)
          CommonHelper.showSuccessMess(`Thêm bài hát thành công`)
          dispatch(resetStatus())
          break
      }
    }
    if (songStoreType === ETypeState.Update) {
      switch (songStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Chỉnh sửa thông tin bài hát thất bại`)
          dispatch(resetStatus())
          break
        case EStatusState.Success:
          setOpenCreateUpdateModal(false)
          CommonHelper.showSuccessMess(`Chỉnh sửa thông tin bài hát thành công`)
          dispatch(resetStatus())
          break
      }
    }
    if (songStoreType === ETypeState.ToggleIsDelete) {
      const title = `
      ${toggleIsDeleteModal.type === TypeToggleIsDeleteModal.Delete ? 'Xóa bài hát ' : 'Kích hoạt bài hát '} 
      ${song?.name}`

      switch (songStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`${title} thất bại`)
          break
        case EStatusState.Success:
          setOpenToggleIsDeleteModal(false)
          CommonHelper.showSuccessMess(`${title} thành công`)
          dispatch(resetStatus())
          break
      }
    }
  }, [songStoreValue, songStoreStatus, songStoreType])

  const [pageSize, setPageSize] = useState<number>(10)
  const columns: GridColDef[] = [
    { field: 'songId', headerName: 'Mã bài hát', flex: 1 },
    { field: 'name', headerName: 'Tên bài hát', flex: 1 },
    { field: 'code', headerName: 'Code', flex: 1 },
    { field: 'total_listen', headerName: 'Lượt nghe', flex: 1 },
    { field: 'country', headerName: 'Quốc gia', flex: 1 },
    { field: 'artistName', headerName: 'Ca sĩ', flex: 1 },
    {
      field: 'thumbnail',
      headerName: 'Ảnh',
      headerAlign: 'center',
      disableExport: true,
      renderCell: (params: GridRenderCellParams<ISong>) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <img src={params.row.thumbnail} alt="" width={50} height={40} />
          </div>
        )
      },
    },
    {
      field: 'isDelete',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      disableExport: true,
      renderCell: (params: GridRenderCellParams<ISong>) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Switch
              checked={params.row.isDeleted}
              onChange={(e) => toggleSwitchIsDelete(e, params.row)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        )
      },
    },

    {
      field: '_id',
      headerName: 'Thao tác',
      width: 150,
      headerAlign: 'center',
      disableExport: true,
      renderCell: (params: GridRenderCellParams<ISong>) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-evenly', flex: 1 }}>
            {/* <IconButton color="warning" onClick={() => clickDetailButton(params.row)}>
              <Visibility />
            </IconButton> */}

            <IconButton color="primary" onClick={() => clickUpdateButton(params.row)}>
              <Edit />
            </IconButton>
          </div>
        )
      },
    },
  ]

  const [song, setSong] = useState<ISong>()
  // isdelete
  const [openToggleIsDeleteModal, setOpenToggleIsDeleteModal] = useState(false)
  const [toggleIsDeleteModal, setToggleIsDeleteModal] = useState({
    type: TypeToggleIsDeleteModal.Delete,
    title: ``,
  })

  const toggleSwitchIsDelete = (event: ChangeEvent<HTMLInputElement>, songClicked: ISong) => {
    setSong(songClicked)
    const isActive = event.target.checked
    setOpenToggleIsDeleteModal(true)
    setToggleIsDeleteModal({
      title: isActive ? 'Kích hoạt bài hát ' : 'Xóa bài hát ',
      type: isActive ? TypeToggleIsDeleteModal.Active : TypeToggleIsDeleteModal.Delete,
    })
  }
  // create/update
  const [openCreateUpdateModal, setOpenCreateUpdateModal] = useState(false)
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const clickCreateButton = () => {
    setOpenCreateUpdateModal(true)
    setIsUpdateModal(false)
  }
  const clickUpdateButton = (songClicked: ISong) => {
    setSong(songClicked)
    setOpenCreateUpdateModal(true)
    setIsUpdateModal(true)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('button-create-wrapper')}>
          <Button size="small" variant="contained" color="success" onClick={clickCreateButton}>
            Thêm
          </Button>
        </div>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={songStoreValue}
            columns={columns}
            getRowId={(row: ISong) => row.songId}
            autoHeight
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 50]}
            pagination
            components={{ Toolbar: GridToolbar }}
            disableSelectionOnClick
          />
        </Box>
      </div>

      <CreateUpdateSongModal
        song={song}
        open={openCreateUpdateModal}
        setOpen={setOpenCreateUpdateModal}
        isUpdate={isUpdateModal}
      />

      <CustomizeModal title={`Xác nhận`} open={openToggleIsDeleteModal} setOpen={setOpenToggleIsDeleteModal}>
        <p>
          {toggleIsDeleteModal.title}
          <span className="danger-color" style={{ fontSize: '18px' }}>
            {song?.name}
          </span>
          ?
        </p>
        <div className="bottom-button-group">
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => dispatch(toggleIsDeleteSong(song?.songId as number))}
          >
            {toggleIsDeleteModal.type === TypeToggleIsDeleteModal.Delete ? 'Xóa' : 'Kích hoạt'}
          </Button>
        </div>
      </CustomizeModal>
    </div>
  )
}

export default Song
