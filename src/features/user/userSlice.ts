import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import * as service from './userService'

import { EStatusState, ETypeState } from '../../constants/common'
import { IUser } from '../../Interfaces/store/IUser'
interface userState {
  value: IUser[]
  status: EStatusState
  type: ETypeState
}

const initialState: userState = {
  value: [],
  status: EStatusState.Idle,
  type: ETypeState.Get,
}
export const getAllUser = createAsyncThunk('user/getAllUser', async () => {
  let res = await service.getAllUser()
  return res.data
})
export const toggleIsDeleteUser = createAsyncThunk('user/toggleIsDeleteUser', async (id: number) => {
  let res = await service.toggleIsDeleteUser(id)
  console.log(res)
  return res.data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = EStatusState.Idle
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypeState.Get
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.value = action.payload
        state.type = ETypeState.Get
      })
      .addCase(getAllUser.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypeState.Get
      })
    builder
      .addCase(toggleIsDeleteUser.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypeState.ToggleIsDelete
      })
      .addCase(toggleIsDeleteUser.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.type = ETypeState.ToggleIsDelete

        const index = state.value.findIndex((x) => x.userId === action.payload.userId)
        state.value[index] = action.payload
        state.value = [...state.value]
      })
      .addCase(toggleIsDeleteUser.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypeState.ToggleIsDelete
      })
  },
})

export const { resetStatus } = userSlice.actions

export const userStore = (state: RootState) => state.user

export default userSlice.reducer
