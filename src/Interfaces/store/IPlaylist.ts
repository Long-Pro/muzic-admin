import { ISong } from './ISong'

export interface IPlaylist {
  createdDate: Date
  updatedDate: Date
  playlistId: number
  name: string
  isPublic: boolean
  userId: number
  userName?: string
  thumbnail: string
  songResponses: ISong[]
}
export interface IPlaylistCreate {
  name: string
  isPublic: boolean
}

export interface IPlaylistUpdateName {
  playlistId: number
  name: string
}
export interface IPlaylistInsertSong {
  playlistId: number
  listSongId: number[]
}
export interface IPlaylistRemoveSong {
  playlistId: number
  songId: number
}
export interface IPlaylistUpdateSong {
  playlistId: number
  listSongId: number[]
}
