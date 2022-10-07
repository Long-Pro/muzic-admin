import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import * as service from './service'
import { IOwner } from '../../Interfaces/base/IOwner'
import { ILogin } from '../../Interfaces/base/ILogin'

export interface ownerState {
  value: IOwner | null
  status: 'success' | 'loading' | 'failed'
}

const initialState: ownerState = {
  value: null,
  status: 'success',
}
export const login = createAsyncThunk('owner/login', async (login: ILogin) => {
  const response = await service.login(login)
  return response
})

export const ownerSlice = createSlice({
  name: 'owner',
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

export const {} = ownerSlice.actions

export const ownerValue = (state: RootState) => state.owner.value

export default ownerSlice.reducer
