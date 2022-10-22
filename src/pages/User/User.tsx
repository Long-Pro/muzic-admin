import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { Box, Button, IconButton } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { Delete } from '@mui/icons-material'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ETypeState, EStatusState } from '../../constants/common'
import { getAllUser, deleteUser, userStore } from '../../features/user/userSlice'
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
          break
      }
    }
    if (userStoreType === ETypeState.Delete) {
      switch (userStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Xóa người dùng ${user?.name} thất bại`)
          break
        case EStatusState.Success:
          setShowDeleteModal(false)
          CommonHelper.showSuccessMess(`Xóa người dùng ${user?.name} thành công`)
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
      field: 'isDeleted',
      headerName: 'Trạng thái',
      flex: 1,
      valueGetter: (params: GridRenderCellParams<IUser>) => (params.row.isDeleted ? 'Đã xóa' : 'Hoạt động'),
    },
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
      field: '_id',
      headerName: 'Thao tác',
      headerAlign: 'center',
      disableExport: true,
      renderCell: (params: GridRenderCellParams<IUser>) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <IconButton disabled={params.row.isDeleted} onClick={() => clickDeleteButton(params.row)} color="error">
              <Delete />
            </IconButton>
          </div>
        )
      },
    },
  ]

  const [user, setUser] = useState<IUser>()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const clickDeleteButton = (userClicked: IUser) => {
    setUser(userClicked)
    setShowDeleteModal(true)
  }
  const handleDeleteUser = () => {
    setShowDeleteModal(false)
    dispatch(deleteUser(user?.userId as number))
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
          />
        </Box>
      </div>
      <CustomizeModal title={`Xác nhận`} open={showDeleteModal} setOpen={setShowDeleteModal}>
        <p>
          Bạn chắc chắn muốn xóa người dùng{' '}
          <h4 className="danger-color" style={{ display: 'inline' }}>
            {user?.name}
          </h4>
          ?
        </p>
        <div className="bottom-button-group">
          <Button size="small" variant="contained" color="error" onClick={handleDeleteUser}>
            Xóa
          </Button>
        </div>
      </CustomizeModal>
    </div>
  )
}

export default User
