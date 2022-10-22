import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import * as service from './ownerService'
import { IOwner } from '../../Interfaces/store/IOwner'
import { ILogin } from '../../Interfaces/store/ILogin'
import { UserCredential } from 'firebase/auth'
import { CommonHelper } from '../../utils/CommonHelper'
import { EStatusState } from '../../constants/common'
export interface ownerState {
  value: IOwner | null
  status: EStatusState
}

const initialState: ownerState = {
  value: null,
  status: EStatusState.Idle,
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
        state.status = EStatusState.Loading
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.value = action.payload
      })
      .addCase(login.rejected, (state) => {
        state.status = EStatusState.Failed
      })
  },
})

export const {} = ownerSlice.actions

export const ownerStore = (state: RootState) => state.owner

export default ownerSlice.reducer
