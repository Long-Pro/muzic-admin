import { IOwner } from '../../Interfaces/base/IOwner'
import { ILogin } from '../../Interfaces/base/ILogin'
import _axios from '../../utils/_axios'
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { auth } from '../../configs/firebase'

export async function login(login: ILogin): Promise<UserCredential> {
  //const link = '/api/login'
  //return _axios.post(link, { username: login.username, password: login.password })
  //return new Promise<IOwner>((resolve) => setTimeout(() => resolve({ account: 'long-pro', name: 'Long' }), 1000))

  return signInWithEmailAndPassword(auth, login.username, login.password)
}
