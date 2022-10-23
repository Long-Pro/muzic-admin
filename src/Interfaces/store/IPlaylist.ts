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
export interface IPlaylistUpdate extends IPlaylistCreate {
  playlistId: number
}
export interface IPlaylistUpdateName {
  playlistId: number
  name: string
}
