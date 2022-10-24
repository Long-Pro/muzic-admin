import { IArtist, IArtistCreate, IArtistUpdate } from '../../Interfaces/store/IArtist'

import _axios from '../../utils/_axios'

export async function getAllArtist(): Promise<{ data: IArtist[] }> {
  const link = `/api/artist`
  return await _axios.get(link)
}
export async function deleteArtist(id: number): Promise<{ data: IArtist }> {
  const link = `/api/artist/delete/${id}`
  return await _axios.put(link)
}
export async function createArtist(data: IArtistCreate): Promise<{ data: IArtist }> {
  const link = `/api/artist`
  return await _axios.post(link, data)
}
export async function updateArtist(data: IArtistUpdate): Promise<{ data: IArtist }> {
  const link = `/api/artist`
  return await _axios.put(link, data)
}
