import { ISong } from './../../Interfaces/base/ISong'
import { IOwner } from '../../Interfaces/base/IOwner'
import { ILogin } from '../../Interfaces/base/ILogin'
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
