import { useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { meValue } from '../../features/me/meSlice'
import { login } from '../../features/me/meSlice'
import { ILogin } from '../../Interfaces/base/ILogin'

import { Button, TextField } from '@mui/material'
import styles from './index.module.scss'

function Login() {
  const dispatch = useAppDispatch()
  let navigate = useNavigate()

  const me = useAppSelector(meValue)
  const [loginValue, setLoginValue] = useState<ILogin>({ account: '', password: '' })
  useEffect(() => {
    dispatch(login(loginValue))
  }, [])
  const handleChangeAccount = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginValue({ ...loginValue, account: event.target.value })
  }
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginValue({ ...loginValue, password: event.target.value })
  }
  const handleLogin = () => {
    console.log(loginValue)
    console.log(me)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}></div>
      <div className={styles.form}>
        <div className={styles.title}>ĐĂNG NHẬP</div>
        <TextField
          required
          label="Tài khoản"
          value={loginValue.account}
          fullWidth
          margin="normal"
          onChange={handleChangeAccount}
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
