import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import * as service from './songService'
import { ISong } from '../../Interfaces/base/ISong'

import { EStatus } from '../../constants/EStatus'
export interface ownerState {
  value: ISong[] | null
  status: EStatus
}

const initialState: ownerState = {
  value: null,
  status: EStatus.Idle,
}
export const getAllSong = createAsyncThunk('song/getAllSong', async () => {
  let res = await service.getAllSong()
  return res.data
})

export const songSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSong.pending, (state) => {
        state.status = EStatus.Loading
      })
      .addCase(getAllSong.fulfilled, (state, action) => {
        state.status = EStatus.Success
        state.value = action.payload
      })
      .addCase(getAllSong.rejected, (state) => {
        state.status = EStatus.Failed
      })
  },
})

export const {} = songSlice.actions

export const songStore = (state: RootState) => state.song

export default songSlice.reducer
