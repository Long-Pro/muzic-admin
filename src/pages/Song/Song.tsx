import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { updateHeaderTitle } from '../../features/app/appSlice'
import { getAllSong, deleteSong, songStore } from '../../features/song/songSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { CommonHelper } from '../../utils/CommonHelper'
import images from '../../assets/images'
import styles from './Song.module.scss'
import { ISong } from '../../Interfaces/base/ISong'
import { ETypeState, EStatusState } from '../../constants/common'
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  IconButton,
} from '@mui/material'
import { Visibility, Edit, Delete } from '@mui/icons-material'
import CreateSongUpdateForm from './CreateSongUpdateForm/CreateSongUpdateForm'
import SongDetail from './SongDetail/SongDetail'

const cx = classNames.bind(styles)
function Song() {
  const dispatch = useAppDispatch()

  const { status: songStoreStatus, value: songStoreValue, type: songStoreType } = useAppSelector(songStore)

  const [filterBy, setFilterBy] = useState<string>('name')

  useEffect(() => {
    dispatch(updateHeaderTitle('BÀI HÁT'))
    dispatch(getAllSong())
  }, [])
  useEffect(() => {
    setSongs(songStoreValue)
    if (songStoreType === ETypeState.Get) {
      switch (songStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Lấy dữ liệu thất bại`)
          break
        case EStatusState.Success:
          setNames(CommonHelper.filterUniqueValue<string>(songStoreValue.map((x) => x.name)))
          setCodes(CommonHelper.filterUniqueValue<string>(songStoreValue.map((x) => x.code)))
          setSongIds(
            CommonHelper.filterUniqueValue<number>(songStoreValue.map((x) => x.songId)).map((x) => x.toString()),
          )
          setArtistNames(CommonHelper.filterUniqueValue<string>(songStoreValue.map((x) => x.artistName)))
          break
      }
    }
    if (songStoreType === ETypeState.Delete) {
      switch (songStoreStatus) {
        case EStatusState.Failed:
          CommonHelper.showErrorMess(`Xóa bài hát ${song?.name} thất bại`)
          break
        case EStatusState.Success:
          setShowDeleteModal(true)
          CommonHelper.showSuccessMess(`Xóa bài hát ${song?.name} thành công`)
          break
      }
    }
  }, [songStoreValue, songStoreStatus, songStoreType])

  const [songs, setSongs] = useState<ISong[]>([])
  const [filterValue, setFilterValue] = useState<string | null>(null)
  const [pageSize, setPageSize] = useState<number>(25)
  const [names, setNames] = useState<string[]>([])
  const [codes, setCodes] = useState<string[]>([])
  const [songIds, setSongIds] = useState<string[]>([])
  const [artistNames, setArtistNames] = useState<string[]>([])
  useEffect(() => {
    getDataSourceFilter(filterBy)
  }, [filterBy])
  const handleChangeFilterValue = (event: any, newValue: string | null) => {
    setFilterValue(newValue) //setFilterValue(newValue ?? '')
    console.log(newValue)
    if (newValue) {
      const data = songStoreValue.filter((x: any) => x[filterBy] == newValue)
      setSongs(data)
    } else {
      setSongs(songStoreValue)
    }
  }
  const handleChangeFilterBy = (event: SelectChangeEvent<string>) => {
    setFilterBy(event.target.value)
  }
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

  const [song, setSong] = useState<ISong | undefined>()
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

  const clickDetailButton = (songClick: ISong) => {
    console.log(songClick)
    setSong(songClick)
    setShowDetailModal(true)
  }
  const clickEditButton = (songclick: ISong) => {}
  const clickDeleteButton = (songClick: ISong) => {
    setSong(songClick)
    console.log(songClick)
  }
  const handleDeleteSong = () => {
    setShowDeleteModal(false)
    dispatch(deleteSong(song?.songId as number))
  }

  const columns: GridColDef[] = [
    { field: 'songId', headerName: 'Mã bài hát', flex: 1 },
    { field: 'name', headerName: 'Tên bài hát', flex: 1 },
    { field: 'code', headerName: 'Code', flex: 1 },
    { field: 'total_listen', headerName: 'Lượt nghe', flex: 1 },
    { field: 'country', headerName: 'Quốc gia', flex: 1 },
    { field: 'artistName', headerName: 'Ca sĩ', flex: 1 },
    {
      field: 'isDeleted',
      headerName: 'Trạng thái',
      flex: 1,
      valueGetter: (params: GridRenderCellParams<ISong>) => (params.row.isDeleted ? 'Đã xóa' : 'Hoạt động'),
    },
    {
      field: '_id',
      headerName: 'Thao tác',
      width: 150,
      headerAlign: 'center',
      disableExport: true,
      renderCell: (params: GridRenderCellParams<ISong>) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-evenly', flex: 1 }}>
            <IconButton color="warning" onClick={() => clickDetailButton(params.row)}>
              <Visibility />
            </IconButton>

            <IconButton color="primary" onClick={() => clickEditButton(params.row)}>
              <Edit />
            </IconButton>

            <IconButton disabled={params.row.isDeleted} onClick={() => clickDeleteButton(params.row)} color="error">
              <Delete />
            </IconButton>
          </div>
        )
      },
    },
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
              <MenuItem value={'songId'}>Id</MenuItem>
              <MenuItem value={'code'}>Code</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className={cx('content')}>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={songs}
            columns={columns}
            getRowId={(row: ISong) => row.songId}
            autoHeight
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[25, 50, 100]}
            pagination
          />
        </Box>
      </div>
      {showCreateModal && <CreateSongUpdateForm isCreate />}
      {showEditModal && <CreateSongUpdateForm song={song} />}
      {showDetailModal && <SongDetail song={song as ISong} open={showDetailModal} setOpen={setShowDetailModal} />}
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="modal-wrapper">
          <h3 className="title">Xóa bài hát {song?.name}?</h3>
          <div className="bottom-button-group">
            <Button size="small" variant="contained" color="warning" onClick={() => setShowDeleteModal(false)}>
              Thoát
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => handleDeleteSong()}
              sx={{ marginLeft: '20px' }}
            >
              Xóa
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Song
