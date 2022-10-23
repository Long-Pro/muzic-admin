export interface IArtist {
  createdDate: Date
  updatedDate: Date
  id: number
  name: string
  code: string
  isDeleted: boolean
  _id?: number
  _label?: string
}
export interface IArtistCreate {
  name: string
  code?: string
}
export interface IArtistUpdate extends IArtistCreate {
  artistId: number
}
