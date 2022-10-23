import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react'
import classNames from 'classnames/bind'
import { Button, TextField, Autocomplete, Chip, Stack } from '@mui/material'

import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { CustomizeModal } from '../../../components'
import images from '../../../assets/images'
import styles from './UpdateSongInPlaylistModal.module.scss'
import { updateSongInPlaylist } from '../../../features/playlist/playlistSlice'
import { IPlaylist, IPlaylistUpdateSong } from '../../../Interfaces/store/IPlaylist'
import { songStore, getAllSong } from '../../../features/song/songSlice'
import { ISong } from '../../../Interfaces/store/ISong'
const cx = classNames.bind(styles)
interface IProp {
  playlist: IPlaylist
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

function UpdateSongInPlaylistModal({ playlist, open, setOpen }: IProp) {
  const dispatch = useAppDispatch()
  const { status: songStoreStatus, value: songStoreValue, type: songStoreType } = useAppSelector(songStore)

  useEffect(() => {
    dispatch(getAllSong())
  }, [])
  useEffect(() => {
    setSongOptions(songStoreValue.filter((x) => playlist.songResponses.findIndex((y) => y.songId === x.songId) === -1))
  }, [songStoreStatus, songStoreValue])

  const [title, setTitle] = useState(`Chỉnh sửa bài hát trong playlist ${playlist?.name}`)
  const [song, setSong] = useState<ISong | null>()
  const [songInPlaylist, setSongInPlaylist] = useState<ISong[]>(
    playlist.songResponses.map((x) => ({ ...x, _label: `${x.name} - ${x.songId}` })),
  )
  const [songOptions, setSongOptions] = useState<ISong[]>(
    songStoreValue.filter((x) => !playlist.songResponses.includes(x)),
  )
  const changeSongAutocomplete = (event: any, newValue: ISong | null) => {
    if (newValue) {
      console.log(newValue)

      setSongInPlaylist([...songInPlaylist, newValue])
      setSongOptions(songOptions.filter((x) => x.songId !== newValue?.songId))
    }
  }
  const removeSongInPlaylist = (song: ISong) => {
    setSongInPlaylist(songInPlaylist.filter((x) => x.songId !== song.songId))
    setSongOptions([...songOptions, song])
  }
  const handleUpdateSongInPlaylist = () => {
    dispatch(updateSongInPlaylist({ playlistId: playlist.playlistId, listSongId: songInPlaylist.map((x) => x.songId) }))
  }

  return (
    <>
      <CustomizeModal open={open} setOpen={setOpen} title={title}>
        <div className={cx('wrapper')}>
          <div className="justify-content-center">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={songOptions}
              sx={{ width: '300px' }}
              value={song}
              getOptionLabel={(x) => x._label as string}
              onChange={changeSongAutocomplete}
              renderInput={(params) => <TextField {...params} margin="normal" label="Bài hát" />}
            />
          </div>
          <div className={cx('chip-wrapper')}>
            {songInPlaylist.map((x) => (
              <Chip
                label={x._label}
                onDelete={() => removeSongInPlaylist(x)}
                key={x.songId}
                sx={{ margin: '20px 20px 0 0' }}
              />
            ))}
          </div>
        </div>
        <div className="bottom-button-group">
          <Button size="small" variant="contained" color="success" onClick={handleUpdateSongInPlaylist}>
            Chỉnh sửa
          </Button>
        </div>
      </CustomizeModal>
    </>
  )
}

export default UpdateSongInPlaylistModal
