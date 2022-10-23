import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { Box, Button, IconButton } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { Delete, Edit, AddCircleOutline } from '@mui/icons-material'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ETypePlaylistState, EStatusState } from '../../constants/common'
import { getAllPlaylist, deletePlaylist, playlistStore } from '../../features/playlist/playlistSlice'
import { updateHeaderTitle } from '../../features/app/appSlice'
import { IPlaylist } from '../../Interfaces/store/IPlaylist'
import { CommonHelper } from '../../utils/CommonHelper'
import CreateUpdatePlaylistModal from './CreateUpdatePlaylistModal/CreateUpdatePlaylistModal'

import { CustomizeModal } from '../../components'
import images from '../../assets/images'
import styles from './Playlist.module.scss'
const cx = classNames.bind(styles)
function Playlist() {
  const dispatch = useAppDispatch()
  const {
    status: playlistStoreStatus,
    value: playlistStoreValue,
    type: playlistStoreType,
  } = useAppSelector(playlistStore)

  useEffect(() => {
    dispatch(updateHeaderTitle('Playlist'))
    if (playlistStoreValue.length === 0) dispatch(getAllPlaylist())
  }, [])
  useEffect(() => {
    if (playlistStoreType === ETypePlaylistState.Get) {
      switch (playlistStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Lấy dữ liệu thất bại`)
          break
        case EStatusState.Success:
          break
      }
    }
    if (playlistStoreType === ETypePlaylistState.Create) {
      switch (playlistStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Thêm playlist thất bại`)
          break
        case EStatusState.Success:
          setOpenCreateUpdateModal(false)
          CommonHelper.showSuccessMess(`Thêm playlist thành công`)
          break
      }
    }
    if (playlistStoreType === ETypePlaylistState.Update) {
      switch (playlistStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Chỉnh sửa thông tin playlist thất bại`)
          break
        case EStatusState.Success:
          setOpenCreateUpdateModal(false)
          CommonHelper.showSuccessMess(`Chỉnh sửa thông tin playlist thành công`)
          break
      }
    }
    if (playlistStoreType === ETypePlaylistState.UpdateName) {
      switch (playlistStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Chỉnh sửa tên playlist thất bại`)
          break
        case EStatusState.Success:
          setOpenCreateUpdateModal(false)
          CommonHelper.showSuccessMess(`Chỉnh sửa tên playlist thành công`)
          break
      }
    }
    if (playlistStoreType === ETypePlaylistState.UpdateIsPublic) {
      switch (playlistStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Chỉnh sửa trạng thái playlist thất bại`)
          break
        case EStatusState.Success:
          setOpenCreateUpdateModal(false)
          CommonHelper.showSuccessMess(`Chỉnh sửa trạng thái playlist thành công`)
          break
      }
    }
    if (playlistStoreType === ETypePlaylistState.Delete) {
      switch (playlistStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Xóa playlist ${playlist?.name} thất bại`)
          break
        case EStatusState.Success:
          setOpenDeleteModal(false)
          CommonHelper.showSuccessMess(`Xóa playlist ${playlist?.name} thành công`)
          break
      }
    }
  }, [playlistStoreStatus, playlistStoreType])

  const [pageSize, setPageSize] = useState<number>(10)
  const columns: GridColDef[] = [
    { field: 'playlistId', headerName: 'Mã', flex: 1 },
    { field: 'name', headerName: 'Tên', flex: 1 },
    { field: 'userName', headerName: 'Người tạo', flex: 1 },
    {
      field: 'isPublic',
      headerName: 'Trạng thái',
      flex: 1,
      valueGetter: (params: GridRenderCellParams<IPlaylist>) => (params.row.isPublic ? 'public' : 'private'),
    },
    {
      field: '_id',
      headerName: 'Thao tác',
      headerAlign: 'center',
      width: 150,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<IPlaylist>) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <IconButton color="primary" onClick={() => clickUpdateButton(params.row)}>
              <Edit />
            </IconButton>
            <IconButton color="success" onClick={() => clickUpdateButton(params.row)}>
              <AddCircleOutline />
            </IconButton>
            <IconButton disabled={params.row.userId != 18} onClick={() => clickDeleteButton(params.row)} color="error">
              <Delete />
            </IconButton>
          </div>
        )
      },
    },
  ]

  const [playlist, setPlaylist] = useState<IPlaylist>()
  // delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const clickDeleteButton = (playlistClicked: IPlaylist) => {
    setPlaylist(playlistClicked)
    setOpenDeleteModal(true)
  }
  const handleDeletePlaylist = () => {
    dispatch(deletePlaylist(playlist?.playlistId as number))
  }
  // create/update
  const [openCreateUpdateModal, setOpenCreateUpdateModal] = useState(false)
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const clickCreateButton = () => {
    setOpenCreateUpdateModal(true)
    setIsUpdateModal(false)
  }
  const clickUpdateButton = (playlistClicked: IPlaylist) => {
    setPlaylist(playlistClicked)
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
            rows={playlistStoreValue}
            columns={columns}
            getRowId={(row: IPlaylist) => row.playlistId}
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

      <CreateUpdatePlaylistModal
        playlist={playlist}
        open={openCreateUpdateModal}
        setOpen={setOpenCreateUpdateModal}
        isUpdate={isUpdateModal}
      />

      <CustomizeModal title={`Xác nhận`} open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <p>
          Bạn chắc chắn muốn xóa playlist{' '}
          <h4 className="danger-color" style={{ display: 'inline' }}>
            {playlist?.name}
          </h4>
          ?
        </p>
        <div className="bottom-button-group">
          <Button size="small" variant="contained" color="error" onClick={handleDeletePlaylist}>
            Xóa
          </Button>
        </div>
      </CustomizeModal>
    </div>
  )
}

export default Playlist
