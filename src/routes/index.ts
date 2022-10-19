// pages
import { Login, SocialLogin, Artist, Song, Playlist, User } from '../pages'

// layout
import { MainLayout, EmptyLayout } from '../layouts'

const routes = {
  //shoeDetail: '/shoes/@:idShoe',
  //shoeDetail: '/shoes/:shoeId',
  login: '/login',
  user: '/user',
  song: '/song',
  playlist: '/playlist',
  artist: '/artist',
}
const publicRoutes = [{ path: routes.login, page: Login, layout: EmptyLayout }]
const privateRoutes = [
  { path: routes.user, page: User, layout: MainLayout },
  { path: routes.playlist, page: Playlist, layout: MainLayout },
  { path: routes.song, page: Song, layout: MainLayout },
  { path: routes.artist, page: Artist, layout: MainLayout },
]

export { publicRoutes, privateRoutes, routes }
