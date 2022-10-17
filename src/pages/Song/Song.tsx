import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { DataGrid } from '@mui/x-data-grid'

import { updateHeaderTitle } from '../../features/app/appSlice'
import { getAllSong, songStore } from '../../features/song/songSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import images from '../../assets/images'
import styles from './Song.module.scss'
import { ISong } from '../../Interfaces/base/ISong'
import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'

const cx = classNames.bind(styles)
function Song() {
  const dispatch = useAppDispatch()

  const { status: songStoreStatus, value: songStoreValue } = useAppSelector(songStore)

  const [filterBy, setFilterBy] = useState<string>('name')

  useEffect(() => {
    dispatch(updateHeaderTitle('BÀI HÁT'))
    dispatch(getAllSong())
  }, [])

  const [filterValue, setFilterValue] = useState<string>('')
  const [names, setNames] = useState<string[]>([])
  const [codes, setCodes] = useState<string[]>([])
  const [songIds, setSongIds] = useState<number[]>([])
  const [artistNames, setArtistNames] = useState<string[]>([])
  useEffect(() => {
    setNames(songStoreValue.map((x) => x.name))
    setCodes(songStoreValue.map((x) => x.code))
    setSongIds(songStoreValue.map((x) => x.songId))
    setArtistNames(songStoreValue.map((x) => x.artistName))
  }, [songStoreStatus])
  const getDataSourceFilter = (filterBy: string): any[] => {
    let data: any[]
    switch (filterBy) {
      case 'name':
        data = names
        break
      case 'code':
        data = codes
        break
      case 'songId':
        data = songIds
        break
      case 'artistName':
        data = artistNames
        break
      default:
        data = names
        break
    }
    return data
  }
  const handleChangeFilterValue = (event: any, newValue: string) => {
    setFilterValue(newValue)
  }
  const handleChangeFilterBy = (event: SelectChangeEvent<string>) => {
    setFilterBy(event.target.value)
  }

  const columns = [
    { field: 'songId', headerName: 'Mã bài hát', flex: 1 },
    { field: 'name', headerName: 'Tên bài hát', flex: 1 },
    { field: 'code', headerName: 'Code', flex: 1 },
    { field: 'total_listen', headerName: 'Lượt nghe', flex: 1 },
    { field: 'country', headerName: 'Quốc gia', flex: 1 },
    { field: 'artistName', headerName: 'Ca sĩ', flex: 1 },
  ]

  return (
    <div className={cx('wrapper')}>
      <div className={cx('filter-wrapper')}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={getDataSourceFilter(filterBy)}
          sx={{ width: '300px', marginRight: '20px' }}
          value={filterValue}
          renderInput={(params) => <TextField {...params} label="Giá trị" />} //{label={filter=='phone'?'SDT':'ID'}}
          onChange={handleChangeFilterValue}
        />
        <Box sx={{ width: '200px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tìm kiếm</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select2"
              label="Tìm kiếm"
              value={filterBy}
              onChange={handleChangeFilterBy}
            >
              <MenuItem value={'name'}>Tên bài hát</MenuItem>
              <MenuItem value={'artistName'}>Tên ca sĩ</MenuItem>
              <MenuItem value={'id'}>Id</MenuItem>
              <MenuItem value={'code'}>Code</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className={cx('content')}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid rows={songStoreValue} columns={columns} getRowId={(row: ISong) => row.songId} />
        </Box>
      </div>
    </div>
  )
}

export default Song
