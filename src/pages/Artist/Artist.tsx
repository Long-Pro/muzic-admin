import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { Box, Button, IconButton } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { Delete, Edit } from '@mui/icons-material'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ETypeState, EStatusState } from '../../constants/common'
import { getAllArtist, deleteArtist, artistStore } from '../../features/artist/artistSlice'
import { updateHeaderTitle } from '../../features/app/appSlice'
import { IArtist } from '../../Interfaces/store/IArtist'
import { CommonHelper } from '../../utils/CommonHelper'
import CreateUpdateArtistModal from './CreateUpdateArtistModal/CreateUpdateArtistModal'

import { CustomizeModal } from '../../components'
import images from '../../assets/images'
import styles from './Artist.module.scss'
const cx = classNames.bind(styles)
function Artist() {
  const dispatch = useAppDispatch()
  const { status: artistStoreStatus, value: artistStoreValue, type: artistStoreType } = useAppSelector(artistStore)

  useEffect(() => {
    dispatch(updateHeaderTitle('NGƯỜI DÙNG'))
    dispatch(getAllArtist())
  }, [])
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
    if (artistStoreType === ETypeState.Create) {
      switch (artistStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Thêm ca sĩ thất bại`)
          break
        case EStatusState.Success:
          setOpenCreateUpdateModal(false)
          CommonHelper.showSuccessMess(`Thêm ca sĩ thành công`)
          break
      }
    }
    if (artistStoreType === ETypeState.Update) {
      switch (artistStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Chỉnh sửa thông tin ca sĩ thất bại`)
          break
        case EStatusState.Success:
          setOpenCreateUpdateModal(false)
          CommonHelper.showSuccessMess(`Chỉnh sửa thông tin ca sĩ thành công`)
          break
      }
    }
    if (artistStoreType === ETypeState.Delete) {
      switch (artistStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Xóa ca sĩ ${artist?.name} thất bại`)
          break
        case EStatusState.Success:
          setOpenDeleteModal(false)
          CommonHelper.showSuccessMess(`Xóa ca sĩ ${artist?.name} thành công`)
          break
      }
    }
  }, [artistStoreValue, artistStoreStatus, artistStoreType])

  const [pageSize, setPageSize] = useState<number>(10)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Mã ca sĩ', flex: 1 },
    { field: 'name', headerName: 'Tên ca sĩ', flex: 1 },
    { field: 'code', headerName: 'code', flex: 1 },
    {
      field: 'isDeleted',
      headerName: 'Trạng thái',
      flex: 1,
      valueGetter: (params: GridRenderCellParams<IArtist>) => (params.row.isDeleted ? 'Đã xóa' : 'Hoạt động'),
    },
    {
      field: '_id',
      headerName: 'Thao tác',
      headerAlign: 'center',
      disableExport: true,
      renderCell: (params: GridRenderCellParams<IArtist>) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
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

  const [artist, setArtist] = useState<IArtist>()
  // delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const clickDeleteButton = (artistClicked: IArtist) => {
    setArtist(artistClicked)
    setOpenDeleteModal(true)
  }
  const handleDeleteArtist = () => {
    dispatch(deleteArtist(artist?.id as number))
  }
  // create/update
  const [openCreateUpdateModal, setOpenCreateUpdateModal] = useState(false)
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const clickCreateButton = () => {
    setOpenCreateUpdateModal(true)
    setIsUpdateModal(false)
  }
  const clickUpdateButton = (artistClicked: IArtist) => {
    setArtist(artistClicked)
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
            rows={artistStoreValue}
            columns={columns}
            getRowId={(row: IArtist) => row.id}
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

      <CreateUpdateArtistModal
        artist={artist}
        open={openCreateUpdateModal}
        setOpen={setOpenCreateUpdateModal}
        isUpdate={isUpdateModal}
      />

      <CustomizeModal title={`Xác nhận`} open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <p>
          Bạn chắc chắn muốn xóa ca sĩ{' '}
          <h4 className="danger-color" style={{ display: 'inline' }}>
            {artist?.name}
          </h4>
          ?
        </p>
        <div className="bottom-button-group">
          <Button size="small" variant="contained" color="error" onClick={handleDeleteArtist}>
            Xóa
          </Button>
        </div>
      </CustomizeModal>
    </div>
  )
}

export default Artist
