import { ToastContainer, toast } from 'react-toastify'

export class CommonHelper {
  static showSuccessMess(message: string): void {
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  static showErrorMess(message: string): void {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  static filterUniqueValue<T>(arr: T[]) {
    const res: T[] = []
    arr.forEach((x) => {
      if (!res.includes(x)) res.push(x)
    })
    //res.sort()
    return res
  }
}
