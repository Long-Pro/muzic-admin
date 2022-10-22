import { IOwner } from '../../Interfaces/store/IOwner'
import { ILogin } from '../../Interfaces/store/ILogin'
import _axios from '../../utils/_axios'
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { auth } from '../../configs/firebase'

export async function login(login: ILogin): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, login.username, login.password)
}
