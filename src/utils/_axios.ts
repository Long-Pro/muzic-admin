import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://localhost:7138/',
})
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    let { message, data } = response.data
    return { message, data }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let { message, data } = error.response.data
    return Promise.reject({ message, data })
  },
)
export default instance
