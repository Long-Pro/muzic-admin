import axios from 'axios'
const instance = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_LINK}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    //'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    //'Content-Type': 'application/x-www-form-urlencoded',
  },
})
export default instance
