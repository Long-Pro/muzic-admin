import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { Box, Button, IconButton } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { Delete, Edit, LibraryMusic } from '@mui/icons-material'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ETypePlaylistState, EStatusState } from '../../constants/common'
import { getAllPlaylist, deletePlaylist, playlistStore, resetStatus } from '../../features/playlist/playlistSlice'
import { ownerStore } from '../../features/owner/ownerSlice'
import { updateHeaderTitle } from '../../features/app/appSlice'
import { IPlaylist } from '../../Interfaces/store/IPlaylist'
import { CommonHelper } from '../../utils/CommonHelper'
import CreateUpdatePlaylistModal from './CreateUpdatePlaylistModal/CreateUpdatePlaylistModal'

import UpdateSongInPlaylistModal from './UpdateSongInPlaylistModal/UpdateSongInPlaylistModal'
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
  const { status: ownerStoreStatus, value: ownerStoreValue } = useAppSelector(ownerStore)

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
          dispatch(resetStatus())
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
          dispatch(resetStatus())
          break
      }
    }
    // if (playlistStoreType === ETypePlaylistState.Update) {
    //   switch (playlistStoreStatus) {
    //     case EStatusState.Failed:
    //       CommonHelper.showErrorMess(`Chỉnh sửa thông tin playlist thất bại`)
    //       break
    //     case EStatusState.Success:
    //       setOpenCreateUpdateModal(false)
    //       CommonHelper.showSuccessMess(`Chỉnh sửa thông tin playlist thành công`)
    //       break
    //   }
    // }
    if (playlistStoreType === ETypePlaylistState.UpdateName) {
      switch (playlistStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Chỉnh sửa tên playlist thất bại`)
          break
        case EStatusState.Success:
          setOpenCreateUpdateModal(false)
          CommonHelper.showSuccessMess(`Chỉnh sửa tên playlist thành công`)
          dispatch(resetStatus())
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
          dispatch(resetStatus())
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
          dispatch(resetStatus())
          break
      }
    }
    if (playlistStoreType === ETypePlaylistState.UpdateSongInPlaylist) {
      switch (playlistStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Chỉnh sửa bài hát trong playlist ${playlist?.name} thất bại`)
          break
        case EStatusState.Success:
          setOpenDeleteModal(false)
          CommonHelper.showSuccessMess(`Chỉnh sửa bài hát trong playlist ${playlist?.name} thành công`)
          dispatch(resetStatus())
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
            <IconButton
              disabled={params.row.userName !== ownerStoreValue?.email}
              color="primary"
              onClick={() => clickUpdateButton(params.row)}
            >
              <Edit />
            </IconButton>
            <IconButton
              disabled={params.row.userName !== ownerStoreValue?.email}
              color="success"
              onClick={() => clickUpdateSongInPlaylistButton(params.row)}
            >
              <LibraryMusic />
            </IconButton>
            <IconButton
              disabled={params.row.userName !== ownerStoreValue?.email}
              onClick={() => clickDeleteButton(params.row)}
              color="error"
            >
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
  // insert song to playlist
  const [openUpdateSongInPlaylistModal, setOpenUpdateSongInPlaylistModal] = useState(false)
  const clickUpdateSongInPlaylistButton = (playlistClicked: IPlaylist) => {
    setPlaylist(playlistClicked)
    setOpenUpdateSongInPlaylistModal(true)
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
      {openUpdateSongInPlaylistModal && (
        <UpdateSongInPlaylistModal
          playlist={playlist as IPlaylist}
          open={openUpdateSongInPlaylistModal}
          setOpen={setOpenUpdateSongInPlaylistModal}
        />
      )}

      <CustomizeModal title={`Xác nhận`} open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <p>
          Bạn chắc chắn muốn xóa playlist{' '}
          <span className="danger-color" style={{ fontSize: '20px' }}>
            {playlist?.name}
          </span>
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
