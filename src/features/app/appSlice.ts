import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'

export interface appState {
  headerTitle: string
}

const initialState: appState = {
  headerTitle: '',
}
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateHeaderTitle: (state, action: PayloadAction<string>) => {
      state.headerTitle = action.payload
    },
  },
})

export const { updateHeaderTitle } = appSlice.actions

export const appStore = (state: RootState) => state.app

export default appSlice.reducer
