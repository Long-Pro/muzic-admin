import axios from 'axios'
const instance = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_LINK}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})
export default instance
