import { useState, useEffect, ChangeEvent } from 'react'
import classNames from 'classnames/bind'
import { Box, Button, IconButton, Switch } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { Delete, Edit } from '@mui/icons-material'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ETypeState, EStatusState, TypeToggleIsDeleteModal } from '../../constants/common'
import { getAllArtist, toggleIsDeleteArtist, artistStore, resetStatus } from '../../features/artist/artistSlice'
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
          dispatch(resetStatus())
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
          dispatch(resetStatus())
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
          dispatch(resetStatus())
          break
      }
    }
    if (artistStoreType === ETypeState.ToggleIsDelete) {
      const title = `
      ${toggleIsDeleteModal.type === TypeToggleIsDeleteModal.Delete ? 'Xóa ca sĩ ' : 'Kích hoạt ca sĩ '} 
      ${artist?.name}`

      switch (artistStoreStatus) {
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
  }, [artistStoreValue, artistStoreStatus, artistStoreType])

  const [pageSize, setPageSize] = useState<number>(10)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Mã ca sĩ', flex: 1 },
    { field: 'name', headerName: 'Tên ca sĩ', flex: 1 },
    { field: 'code', headerName: 'code', flex: 1 },
    {
      field: 'isDelete',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      disableExport: true,
      renderCell: (params: GridRenderCellParams<IArtist>) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Switch
              checked={!params.row.isDeleted}
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
      headerAlign: 'center',
      disableExport: true,
      renderCell: (params: GridRenderCellParams<IArtist>) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <IconButton color="primary" onClick={() => clickUpdateButton(params.row)}>
              <Edit />
            </IconButton>
          </div>
        )
      },
    },
  ]

  const [artist, setArtist] = useState<IArtist>()
  // isdelete
  const [openToggleIsDeleteModal, setOpenToggleIsDeleteModal] = useState(false)
  const [toggleIsDeleteModal, setToggleIsDeleteModal] = useState({
    type: TypeToggleIsDeleteModal.Delete,
    title: ``,
  })
  const toggleSwitchIsDelete = (event: ChangeEvent<HTMLInputElement>, artistClicked: IArtist) => {
    setArtist(artistClicked)
    const isActive = event.target.checked
    setOpenToggleIsDeleteModal(true)
    setToggleIsDeleteModal({
      title: isActive ? 'Kích hoạt ca sĩ ' : 'Xóa ca sĩ ',
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

      <CustomizeModal title={`Xác nhận`} open={openToggleIsDeleteModal} setOpen={setOpenToggleIsDeleteModal}>
        <p>
          {toggleIsDeleteModal.title}
          <span className="danger-color" style={{ fontSize: '18px' }}>
            {artist?.name}
          </span>
          ?
        </p>
        <div className="bottom-button-group">
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => dispatch(toggleIsDeleteArtist(artist?.id as number))}
          >
            {toggleIsDeleteModal.type === TypeToggleIsDeleteModal.Delete ? 'Xóa' : 'Kích hoạt'}
          </Button>
        </div>
      </CustomizeModal>
    </div>
  )
}

export default Artist
