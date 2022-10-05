import { IMe } from '../../Interfaces/base/IMe'
import { ILogin } from '../../Interfaces/base/ILogin'

export function login(login: ILogin) {
  return new Promise<IMe>((resolve) => setTimeout(() => resolve({ account: 'long-pro', name: 'Long' }), 1000))
}
