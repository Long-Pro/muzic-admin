import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import * as service from './service'
import { IMe } from '../../Interfaces/base/IMe'
import { ILogin } from '../../Interfaces/base/ILogin'

export interface meState {
  value: IMe | null
  status: 'success' | 'loading' | 'failed'
}

const initialState: meState = {
  value: null,
  status: 'success',
}
export const login = createAsyncThunk('me/login', async (login: ILogin) => {
  const response = await service.login(login)
  return response
})

export const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success'
        state.value = action.payload
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const {} = meSlice.actions

export const meValue = (state: RootState) => state.me.value

export default meSlice.reducer
