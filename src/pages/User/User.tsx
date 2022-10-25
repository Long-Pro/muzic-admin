import { useState, useEffect, ChangeEvent } from 'react'
import classNames from 'classnames/bind'
import { Box, Button, IconButton, Switch } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { Delete } from '@mui/icons-material'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ETypeState, EStatusState, TypeToggleIsDeleteModal } from '../../constants/common'
import { getAllUser, toggleIsDeleteUser, userStore, resetStatus } from '../../features/user/userSlice'
import { updateHeaderTitle } from '../../features/app/appSlice'
import { IUser } from '../../Interfaces/store/IUser'
import { CommonHelper } from '../../utils/CommonHelper'

import { CustomizeModal } from '../../components'
import images from '../../assets/images'
import styles from './User.module.scss'

const cx = classNames.bind(styles)
function User() {
  const dispatch = useAppDispatch()
  const { status: userStoreStatus, value: userStoreValue, type: userStoreType } = useAppSelector(userStore)

  useEffect(() => {
    dispatch(updateHeaderTitle('NGƯỜI DÙNG'))
    dispatch(getAllUser())
  }, [])
  useEffect(() => {
    if (userStoreType === ETypeState.Get) {
      switch (userStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Lấy dữ liệu thất bại`)
          break
        case EStatusState.Success:
          dispatch(resetStatus())
          break
      }
    }
    if (userStoreType === ETypeState.ToggleIsDelete) {
      const title = `
      ${toggleIsDeleteModal.type === TypeToggleIsDeleteModal.Delete ? 'Xóa người dùng ' : 'Kích hoạt người dùng '} 
      ${user?.name}`

      switch (userStoreStatus) {
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
  }, [userStoreValue, userStoreStatus, userStoreType])
  const [pageSize, setPageSize] = useState<number>(10)
  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'Mã người dùng', flex: 1 },
    { field: 'name', headerName: 'Tên người dùng', flex: 1 },
    { field: 'username', headerName: 'Tài khoản', flex: 1 },
    {
      field: 'avatar',
      headerName: 'Ảnh đại diện',
      headerAlign: 'center',
      disableExport: true,
      renderCell: (params: GridRenderCellParams<IUser>) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <img src={params.row.avatar} alt="" width={50} height={40} />
          </div>
        )
      },
    },
    {
      field: 'isDelete',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      disableExport: true,
      renderCell: (params: GridRenderCellParams<IUser>) => {
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
  ]

  const [user, setUser] = useState<IUser>()
  // isDelete
  const [openToggleIsDeleteModal, setOpenToggleIsDeleteModal] = useState(false)
  const [toggleIsDeleteModal, setToggleIsDeleteModal] = useState({
    type: TypeToggleIsDeleteModal.Delete,
    title: ``,
  })
  const toggleSwitchIsDelete = (event: ChangeEvent<HTMLInputElement>, userClicked: IUser) => {
    setUser(userClicked)
    const isActive = event.target.checked
    setOpenToggleIsDeleteModal(true)
    setToggleIsDeleteModal({
      title: isActive ? 'Kích hoạt người dùng ' : 'Xóa người dùng ',
      type: isActive ? TypeToggleIsDeleteModal.Active : TypeToggleIsDeleteModal.Delete,
    })
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={userStoreValue}
            columns={columns}
            getRowId={(row: IUser) => row.userId}
            autoHeight
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 50]}
            pagination
            components={{ Toolbar: GridToolbar }}
            disableSelectionOnClick
            autoPageSize
          />
        </Box>
      </div>
      <CustomizeModal title={`Xác nhận`} open={openToggleIsDeleteModal} setOpen={setOpenToggleIsDeleteModal}>
        <p>
          {toggleIsDeleteModal.title}
          <span className="danger-color" style={{ fontSize: '18px' }}>
            {user?.name}
          </span>
          ?
        </p>
        <div className="bottom-button-group">
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => dispatch(toggleIsDeleteUser(user?.userId as number))}
          >
            {toggleIsDeleteModal.type === TypeToggleIsDeleteModal.Delete ? 'Xóa' : 'Kích hoạt'}
          </Button>
        </div>
      </CustomizeModal>
    </div>
  )
}

export default User
