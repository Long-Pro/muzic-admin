import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { viVN } from '@mui/material/locale'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const theme = createTheme(viVN)
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  // <React.StrictMode>
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // </React.StrictMode>,
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    <ToastContainer />
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
