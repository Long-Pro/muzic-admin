export interface IArtist {
  createdDate: Date
  updatedDate: Date
  id: number
  name: string
  code: string
  isDeleted: boolean
  _id?: number
}
export interface IArtistCreate {
  name: string
  code?: string
}
export interface IArtistUpdate extends IArtistCreate {
  artistId: number
}
