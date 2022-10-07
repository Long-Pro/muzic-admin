import { useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ownerValue } from '../../features/owner/ownerSlice'
import { updateLoginState } from '../../features/app/appSlice'
import { login } from '../../features/owner/ownerSlice'
import { ILogin } from '../../Interfaces/base/ILogin'
import { routes } from '../../routes'

import { Button, TextField } from '@mui/material'
import styles from './index.module.scss'

function Login() {
  console.log(process.env)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const owner = useAppSelector(ownerValue)
  const [loginValue, setLoginValue] = useState<ILogin>({ username: '', password: '' })
  const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginValue({ ...loginValue, username: event.target.value })
  }
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginValue({ ...loginValue, password: event.target.value })
  }
  const handleLogin = async () => {
    console.log(loginValue)
    console.log(owner)
    dispatch(login(loginValue))
    dispatch(updateLoginState(true))
    navigate(routes.user)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}></div>
      <div className={styles.form}>
        <div className={styles.title}>ĐĂNG NHẬP</div>
        <TextField
          required
          label="Tài khoản"
          value={loginValue.username}
          fullWidth
          margin="normal"
          onChange={handleChangeUsername}
        />
        <TextField
          required
          label="Mật khẩu"
          value={loginValue.password}
          fullWidth
          margin="normal"
          type="password"
          onChange={handleChangePassword}
        />
        <div style={{ height: 30 }}></div>
        <Button variant="contained" fullWidth size="large" style={{ height: 56 }} onClick={handleLogin}>
          Đăng nhập
        </Button>
      </div>
    </div>
  )
}

export default Login
