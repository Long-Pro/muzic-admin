import { IOwner } from '../../Interfaces/base/IOwner'
import { ILogin } from '../../Interfaces/base/ILogin'
import _axios from '../../utils/_axios'

export async function login(login: ILogin): Promise<IOwner> {
  const link = '/api/login'
  return _axios.post(link, { username: login.username, password: login.password })
  //return new Promise<IOwner>((resolve) => setTimeout(() => resolve({ account: 'long-pro', name: 'Long' }), 1000))
}
