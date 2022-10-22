export interface IPlaylist {
  createdDate: Date
  updatedDate: Date
  playlistId: number
  name: string
  isPublic: boolean
  userId: number

  isDeleted: boolean
  _id?: number
}
export interface IPlaylistCreate {
  name: string
  code?: string
}
export interface IPlaylistUpdate extends IPlaylistCreate {
  PlaylistId: number
}
