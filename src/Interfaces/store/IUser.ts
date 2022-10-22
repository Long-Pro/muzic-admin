export interface IUser {
  createdDate: Date
  updatedDate: Date
  isDeleted: boolean
  userId: number
  name: string
  username: string
  role: string
  avatar: string
  _id?: number
}
// export interface ISongCreate {
//   name?: string
//   country?: string
//   artistId?: number
//   lyric?: any
//   musicFile?: any
//   thumbnail?: any
// }
// export interface ISongUpdate extends ISongCreate {
//   id: number
// }
