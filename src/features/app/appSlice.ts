import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'

export interface appState {
  headerTitle: string
  isLogin: boolean
}

const initialState: appState = {
  headerTitle: '',
  isLogin: false,
}
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateHeaderTitle: (state, action: PayloadAction<string>) => {
      state.headerTitle = action.payload
    },
    updateLoginState: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload
    },
  },
})

export const { updateHeaderTitle, updateLoginState } = appSlice.actions

export const appValue = (state: RootState) => state.app

export default appSlice.reducer
