import { ISong, ISongUpdate, ISongCreate } from '../../Interfaces/store/ISong'
import { IOwner } from '../../Interfaces/store/IOwner'
import { ILogin } from '../../Interfaces/store/ILogin'
import _axios from '../../utils/_axios'
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { auth } from '../../configs/firebase'

export async function getAllSong(): Promise<{ data: ISong[] }> {
  const link = '/api/song'
  return await _axios.get(link)
}
export async function deleteSong(id: number): Promise<{ data: ISong }> {
  const link = `/api/song/delete/${id}`
  return await _axios.put(link)
}
export async function createSong(data: ISongCreate): Promise<{ data: ISong }> {
  const link = `/api/song`
  return await _axios.post(link, data)
}
export async function updateSong(data: ISongUpdate): Promise<{ data: ISong }> {
  const link = `/api/song`
  return await _axios.put(link, data)
}
