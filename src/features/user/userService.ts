import { IUser } from '../../Interfaces/store/IUser'
import _axios from '../../utils/_axios'

export async function getAllUser(): Promise<{ data: IUser[] }> {
  const link = '/api/user'
  return await _axios.get(link)
}
export async function deleteUser(id: number): Promise<{ data: IUser }> {
  const link = `/api/user/delete/${id}`
  return await _axios.put(link)
}
