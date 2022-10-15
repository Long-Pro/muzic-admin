import axios from 'axios'
const instance = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_LINK}`,
})
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
export default instance
