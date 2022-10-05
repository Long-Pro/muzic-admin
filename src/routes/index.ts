// pages
import { Login, Artist, Song, Album, User } from '../pages'

// layout
import { MainLayout, EmptyLayout } from '../layouts'

const routes = {
  home: '/',
  //shoeDetail: '/shoes/@:idShoe',
  shoeDetail: '/shoes/:shoeId',
  login: '/login',
  user: '/user',
  song: '/song',
  album: '/album',
  artist: '/login',
}
const publicRoutes = [{ path: routes.login, page: Login, layout: EmptyLayout }]
const privateRoutes = [
  { path: routes.user, page: User, layout: MainLayout },
  { path: routes.album, page: Album, layout: MainLayout },
  { path: routes.song, page: Song, layout: MainLayout },
  { path: routes.artist, page: Artist, layout: MainLayout },
]

export { publicRoutes, privateRoutes, routes }
