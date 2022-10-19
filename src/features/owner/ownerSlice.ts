import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import * as service from './ownerService'
import { IOwner } from '../../Interfaces/base/IOwner'
import { ILogin } from '../../Interfaces/base/ILogin'
import { UserCredential } from 'firebase/auth'
import { CommonHelper } from '../../utils/CommonHelper'
import { EStatus } from '../../constants/EStatus'
export interface ownerState {
  value: IOwner | null
  status: EStatus
}

const initialState: ownerState = {
  value: null,
  status: EStatus.Idle,
}
export const login = createAsyncThunk('owner/login', async (login: ILogin) => {
  const response = await service.login(login)
  console.log(response)
  const data: IOwner = {
    accessToken: (response.user as any).accessToken,
    email: (response.user as any).email,
    displayName: (response.user as any).displayName,
  }
  return data
})

export const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = EStatus.Loading
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = EStatus.Success
        state.value = action.payload
      })
      .addCase(login.rejected, (state) => {
        state.status = EStatus.Failed
      })
  },
})

export const {} = ownerSlice.actions

export const ownerStore = (state: RootState) => state.owner

export default ownerSlice.reducer
