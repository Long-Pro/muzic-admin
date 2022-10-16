import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { updateHeaderTitle } from '../../features/app/appSlice'
import { getAllSong } from '../../features/song/songSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import images from '../../assets/images'
import styles from './Song.module.scss'
import axios from 'axios'
// let token =
//   'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVkMzQwZGRiYzNjNWJhY2M0Y2VlMWZiOWQxNmU5ODM3ZWM2MTYzZWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWFuZ2F0b29uLWE3NjAzIiwiYXVkIjoibWFuZ2F0b29uLWE3NjAzIiwiYXV0aF90aW1lIjoxNjY1OTE1NzI3LCJ1c2VyX2lkIjoiWmNoRFdMZzZBMU9jeTZWSXM3RXlCMGd4d3ozMiIsInN1YiI6IlpjaERXTGc2QTFPY3k2VklzN0V5QjBneHd6MzIiLCJpYXQiOjE2NjU5MTU3MjcsImV4cCI6MTY2NTkxOTMyNywiZW1haWwiOiJudmwxNjgyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJudmwxNjgyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.PYLaWjzth6JtVvjcSZ51cmbA8UExEXV5Y_fFD47_w7fjuh_G5qzseIrftOPHkcHt7_oTHb59SaycX2SKdqlwbDzXi4KX-jseVn39yMX_dwcwNzxuqin9J3-qmXt8Kmr91L7F_qr0FQJNYkV4gxfFqZ_950J8LJtsi6edUo-eBUUnptVvPWx7mF1YHSxYfF_PeMxgctZde2_3UFxj4qKA_ISQ2rfB5O5AfE1g_SJsCOXp1qPwyP7f1Wjbn6FrlTJTVSebpeliML6rJMQLOo_jnJn_6gHhrOUD5C3TVvA29Ow1IRZmLK6X5PUv68VYIBud4PYm6dp47MgxQ6h_Cyjh3g'
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
const cx = classNames.bind(styles)
function Song() {
  const dispatch = useAppDispatch()
  // useEffect(() => {
  //   // dispatch(updateHeaderTitle('BÀI HÁT'))
  //   // dispatch(getAllSong())
  //   test()
  // }, [])
  // const test = async () => {
  //   // axios
  //   //   .get('http://178.128.85.205/api/song/country/vietnam', {
  //   //     headers: {
  //   //       'Content-Type': 'application/json;charset=utf-8',
  //   //       'Access-Control-Allow-Origin': '*',
  //   //       Accept: 'application/json',
  //   //     },
  //   //   })
  //   //   .then((x: any) => console.log('x', x))
  //   //   .catch((y: any) => console.log('y', y))
  //   fetch('http://178.128.85.205/api/song/country/vietnam', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err))
  // }
  useEffect(() => {
    fetch('http://178.128.85.205/api/song/country/vietnam', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }, [])
  return (
    <div className={cx('wrapper')}>
      <h1>Song</h1>
    </div>
  )
}

export default Song
