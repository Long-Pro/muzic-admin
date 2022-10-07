import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { privateRoutes, publicRoutes, routes } from '.'
import { appValue } from '../features/app/appSlice'
function ProtectedRoute() {
  const isLogin = useAppSelector(appValue).isLogin
  return isLogin ? <Outlet /> : <Navigate to={routes.login} />
}
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          {privateRoutes.map((route, index) => {
            const Page = route.page
            const Layout = route.layout
            return (
              <Route
                path={route.path}
                key={index}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            )
          })}
        </Route>
        {publicRoutes.map((route, index) => {
          const Page = route.page
          const Layout = route.layout
          return (
            <Route
              path={route.path}
              key={index}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            ></Route>
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}
export default Router
