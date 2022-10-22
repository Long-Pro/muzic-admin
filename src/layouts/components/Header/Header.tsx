import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { appStore } from '../../../features/app/appSlice'
import { ownerStore } from '../../../features/owner/ownerSlice'
import { ArrowDropDown } from '@mui/icons-material'

import images from '../../../assets/images'
import styles from './Header.module.scss'
import { Avatar, Menu, MenuItem } from '@mui/material'
import { IOwner } from '../../../Interfaces/store/IOwner'
const cx = classNames.bind(styles)
function Header() {
  const app = useAppSelector(appStore)
  const owner = useAppSelector(ownerStore)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClickUser = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <div>
      <div className={cx('wrapper')}>
        <div className={cx('title')}>{app.headerTitle}</div>
        <div className={cx('user')} id="user" onClick={handleClickUser}>
          <div className={cx('username')}>{owner?.value?.email}</div>
          <ArrowDropDown />
          <Avatar alt="Cindy Baker" src="https://loremflickr.com/100/100" />
        </div>
      </div>
      <Menu id="user-menu" aria-labelledby="user" anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
        <MenuItem>Đổi mật khẩu</MenuItem>
        <MenuItem>Đăng xuất</MenuItem>
      </Menu>
      {/* 
      <Modal
        open={openInfo}
        onClose={() => setOpenInfo(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.wrapInfo}>
          <StaffDetail staff={staff} />
        </div>
      </Modal>
      <Modal
        open={openPassword}
        onClose={() => setOpenPassword(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modalPassword}>
          <div className={styles.wrapPassword}>
            <div className={styles.changePassText}>Thay đổi mật khẩu</div>
            <TextField
              required
              label="Mật khẩu hiện tại"
              value={password.currentPassword}
              error={Boolean(errorMessPassword.currentPassword)}
              helperText={errorMessPassword.currentPassword}
              fullWidth
              margin="normal"
              type="password"
              onChange={(event) => {
                setPassword({ ...password, currentPassword: event.target.value })
              }}
            />
            <TextField
              required
              label="Mật khẩu mới"
              value={password.newPassword}
              error={Boolean(errorMessPassword.newPassword)}
              helperText={errorMessPassword.newPassword}
              fullWidth
              margin="normal"
              type="password"
              onChange={(event) => {
                setPassword({ ...password, newPassword: event.target.value })
              }}
            />
            <TextField
              required
              label="Xác nhận mật khẩu mới"
              value={password.reNewPassword}
              error={Boolean(errorMessPassword.reNewPassword)}
              helperText={errorMessPassword.reNewPassword}
              fullWidth
              margin="normal"
              type="password"
              onChange={(event) => {
                setPassword({ ...password, reNewPassword: event.target.value })
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
              <Button variant="text" sx={{ width: 100 }} onClick={() => setOpenPassword(false)}>
                Hủy
              </Button>
              <Button variant="contained" sx={{ width: 100, marginLeft: '20px' }} onClick={handleChangePass}>
                Đổi
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Dialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div style={{ minWidth: 300 }}>Xác nhận</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Đăng xuất khỏi thiết bị?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogout(false)}>Hủy</Button>
          <Button onClick={handleLogout} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  )
}

export default Header
