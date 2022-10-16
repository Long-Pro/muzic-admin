import axios from 'axios'
const instance = axios.create({
  // baseURL: `http://${process.env.REACT_APP_API_LINK}`,
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-Type': 'application/json',
  // },
  // //withCredentials: true,
})
let token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVkMzQwZGRiYzNjNWJhY2M0Y2VlMWZiOWQxNmU5ODM3ZWM2MTYzZWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWFuZ2F0b29uLWE3NjAzIiwiYXVkIjoibWFuZ2F0b29uLWE3NjAzIiwiYXV0aF90aW1lIjoxNjY1ODU4MDgwLCJ1c2VyX2lkIjoiWmNoRFdMZzZBMU9jeTZWSXM3RXlCMGd4d3ozMiIsInN1YiI6IlpjaERXTGc2QTFPY3k2VklzN0V5QjBneHd6MzIiLCJpYXQiOjE2NjU4NTgwODAsImV4cCI6MTY2NTg2MTY4MCwiZW1haWwiOiJudmwxNjgyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJudmwxNjgyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.fvY9hy00O5WhwLdNb9WjoBZmvQHwt1Mvd2liJs-QhPtLygY4MWVmgdZT8dNBUQgfvM4Mybjp9MGqhbIJbiqZ4bR0Isffairz5YfhB5mwrkaO1aNG2I_S50N4nGaEI5UBv34tDuJM5jLQwMmHp9kDc0EWsnkOTRzmhcc2TuFVwQ9IEk-XVvM4xveMYNmzDreBPIHbAetNGb58PeeAN9wV8FHAK0BXYvS9YTRXDfDxL4aiT4pWlWHpl7J8JE3JC07lz4WyaeDyRHC9KA8ObevDyCP0bAGmzel08XU81I-hSg1G5vR9y4NZjH4qdmXfl5HarMrDHlw-pT3DgmPw9hjKNA'
// instance.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
// instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
//instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
export default instance
