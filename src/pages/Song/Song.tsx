import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'

import { updateHeaderTitle } from '../../features/app/appSlice'
import { getAllSong, deleteSong, songStore } from '../../features/song/songSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { CommonHelper } from '../../utils/CommonHelper'
import images from '../../assets/images'
import styles from './Song.module.scss'
import { ISong } from '../../Interfaces/store/ISong'
import { ETypeState, EStatusState } from '../../constants/common'
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
} from '@mui/material'
import { Visibility, Edit, Delete } from '@mui/icons-material'
import CreateUpdateSongModal from './CreateUpdateSongModal/CreateUpdateSongModal'
import SongDetail from './SongDetail/SongDetail'
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
          break
      }
    }
    if (songStoreType === ETypeState.Update) {
      switch (songStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Chỉnh sửa thông tin bài hát thất bại`)
          break
        case EStatusState.Success:
          setOpenCreateUpdateModal(false)
          CommonHelper.showSuccessMess(`Chỉnh sửa thông tin bài hát thành công`)
          break
      }
    }
    if (songStoreType === ETypeState.Delete) {
      switch (songStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Xóa bài hát ${song?.name} thất bại`)
          break
        case EStatusState.Success:
          setOpenDeleteModal(false)
          CommonHelper.showSuccessMess(`Xóa bài hát ${song?.name} thành công`)
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
      field: 'isDeleted',
      headerName: 'Trạng thái',
      flex: 1,
      valueGetter: (params: GridRenderCellParams<ISong>) => (params.row.isDeleted ? 'Đã xóa' : 'Hoạt động'),
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

            <IconButton disabled={params.row.isDeleted} onClick={() => clickDeleteButton(params.row)} color="error">
              <Delete />
            </IconButton>
          </div>
        )
      },
    },
  ]

  const [song, setSong] = useState<ISong>()
  // delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const clickDeleteButton = (songClicked: ISong) => {
    setSong(songClicked)
    setOpenDeleteModal(true)
  }
  const handleDeleteSong = () => {
    dispatch(deleteSong(song?.songId as number))
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

      <CustomizeModal title={`Xác nhận`} open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <p>
          Bạn chắc chắn muốn xóa bài hát{' '}
          <h4 className="danger-color" style={{ display: 'inline' }}>
            {song?.name}
          </h4>
          ?
        </p>
        <div className="bottom-button-group">
          <Button size="small" variant="contained" color="error" onClick={handleDeleteSong}>
            Xóa
          </Button>
        </div>
      </CustomizeModal>
    </div>
  )
}

export default Song
