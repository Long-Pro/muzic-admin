import { useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ownerStore } from '../../features/owner/ownerSlice'
import { login } from '../../features/owner/ownerSlice'
import { ILogin } from '../../Interfaces/base/ILogin'
import { routes } from '../../routes'
import { CommonHelper } from '../../utils/commonHelper'
import { EStatus } from '../../constants/EStatus'
import styles from './Login.module.scss'

function Login() {
  //console.log(process.env)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const owner = useAppSelector(ownerStore)

  const [loginValue, setLoginValue] = useState<ILogin>({ username: '', password: '' })
  const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginValue({ ...loginValue, username: event.target.value })
  }
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginValue({ ...loginValue, password: event.target.value })
  }
  const handleLogin = async () => {
    dispatch(login(loginValue))
  }
  useEffect(() => {
    if (owner.status === EStatus.Success) navigate(routes.user)
    else if (owner.status === EStatus.Failed) CommonHelper.showErrorMess('Tài khoản hoặc mật khẩu không đúng')
  }, [owner])
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
