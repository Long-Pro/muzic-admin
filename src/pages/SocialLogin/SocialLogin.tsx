import { useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import { auth, google, facebook, twitter, github } from '../../configs/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ownerStore } from '../../features/owner/ownerSlice'
import { login } from '../../features/owner/ownerSlice'
import { ILogin } from '../../Interfaces/store/ILogin'
import { routes } from '../../routes'

import { Button, TextField } from '@mui/material'
import images from '../../assets/images'
import styles from './SocialLogin.module.scss'
const cx = classNames.bind(styles)
function SocialLogin() {
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
    console.log(loginValue)
    console.log(owner)
    await dispatch(login(loginValue))
    //dispatch(updateLoginState(true))
    //navigate(routes.user)
  }
  // useEffect(() => {
  //   const auth = getAuth()
  //   createUserWithEmailAndPassword(auth, 'nvl1682@gmail.com', 'password')
  //     .then((userCredential) => {
  //       // Signed in
  //       console.log(userCredential)
  //       console.log('success')

  //       const user = userCredential.user
  //       // ...
  //     })
  //     .catch((error) => {
  //       console.log('fail')
  //       console.log(error)

  //       const errorCode = error.code
  //       const errorMessage = error.message
  //       // ..
  //     })
  // }, [])

  useEffect(() => {
    signInWithEmailAndPassword(auth, 'nvl1682@gmail.com', 'password')
      .then((userCredential) => {
        // Signed in
        console.log(userCredential)

        //const user = userCredential.user
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(error)
        console.log({ errorCode, errorMessage })
      })
  }, [])

  // useEffect(() => {
  //   if ((owner.status = 'success')) navigate(routes.user)
  //   else console.log(owner)
  // }, [owner])
  const socialLogin = async (
    provider: any, //GoogleAuthProvider | FacebookAuthProvider | TwitterAuthProvider | GithubAuthProvider,
  ) => {
    const result = await signInWithPopup(auth, provider)
    console.log(result)
    // setUser(result.user)
    // setIsLogin(true)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}></div>
      <div className={styles.form}>
        <div className={styles.title}>ĐĂNG NHẬP</div>
        <div className={cx('login-button', 'google')} onClick={() => socialLogin(google)}>
          <img src={images.google} alt="" className={cx('icon')} />
          Google
        </div>
        <div className={cx('login-button', 'facebook')} onClick={() => socialLogin(facebook)}>
          <img src={images.facebook} alt="" className={cx('icon')} />
          Facebook
        </div>
        <div className={cx('login-button', 'github')} onClick={() => socialLogin(github)}>
          <img src={images.github} alt="" className={cx('icon')} />
          Github
        </div>
      </div>
    </div>
  )
}

export default SocialLogin
