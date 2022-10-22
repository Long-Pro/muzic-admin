export interface ISong {
  createdDate: Date
  updatedDate: Date
  isDeleted: boolean
  //favouriteRepository: null,
  songId: number
  name: string
  code: string
  link: string
  lyric: string
  thumbnail: string
  total_listen: number
  country: string
  artistName: string
  artistId: number
  isLiked: boolean
  _id?: any
}
export interface ISongCreate {
  name: string
  country: string
  artistId?: number
  code?: string

  lyric?: any
  musicFile?: any
  thumbnail?: any
}
export interface ISongUpdate extends ISongCreate {
  id: number
}