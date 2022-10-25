import {
  IPlaylist,
  IPlaylistCreate,
  IPlaylistUpdateName,
  IPlaylistRemoveSong,
  IPlaylistInsertSong,
  IPlaylistUpdateSong,
} from '../../Interfaces/store/IPlaylist'
import _axios from '../../utils/_axios'

export async function getAllPlaylist(): Promise<{ data: { data: IPlaylist[] } }> {
  const link = `/api/playlist/public`
  return await _axios.get(link)
}
export async function deletePlaylist(id: number): Promise<{ data: string }> {
  const link = `/api/playlist/${id}`
  return await _axios.delete(link)
}
export async function createPlaylist(data: IPlaylistCreate): Promise<{ data: IPlaylist }> {
  const link = `/api/playlist`
  return await _axios.post(link, data)
}
export async function updateNamePlaylist(data: IPlaylistUpdateName): Promise<{ data: IPlaylist }> {
  const link = `/api/playlist/name`
  return await _axios.put(link, data)
}
export async function updateIsPublicPlaylist(id: number): Promise<{ data: IPlaylist }> {
  const link = `/api/playlist/public/${id}`
  return await _axios.put(link)
}

export async function updateSongInPlaylist(data: IPlaylistUpdateSong): Promise<{ data: IPlaylist }> {
  const link = `/api/playlist/addSong/admin`
  return await _axios.post(link, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
