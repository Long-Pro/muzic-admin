import { useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ownerStore } from '../../features/owner/ownerSlice'
import { login } from '../../features/owner/ownerSlice'
import { ILogin } from '../../Interfaces/store/ILogin'
import { routes } from '../../routes'
import { CommonHelper } from '../../utils/CommonHelper'
import { EStatusState } from '../../constants/common'
import styles from './Login.module.scss'
import _axios from '../../utils/_axios'

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
    if (owner.status === EStatusState.Success) {
      navigate(routes.user)
      const token = owner.value?.accessToken
      console.log(token)
      _axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else if (owner.status === EStatusState.Failed) CommonHelper.showErrorMess('Tài khoản hoặc mật khẩu không đúng')
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
