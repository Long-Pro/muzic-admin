import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import * as service from './songService'
import { ISong } from '../../Interfaces/base/ISong'

import { EStatusState, ETypeState } from '../../constants/common'
export interface ownerState {
  value: ISong[]
  status: EStatusState
  type: ETypeState
}

const initialState: ownerState = {
  value: [],
  status: EStatusState.Idle,
  type: ETypeState.Get,
}
export const getAllSong = createAsyncThunk('song/getAllSong', async () => {
  let res = await service.getAllSong()
  console.log(res)
  return (res.data as any).data
})
export const deleteSong = createAsyncThunk('song/deleteSong', async (id: number) => {
  let res = await service.deleteSong(id)
  console.log(res)
  return res.data
})

export const songSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSong.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypeState.Get
      })
      .addCase(getAllSong.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.value = action.payload
        state.type = ETypeState.Get
      })
      .addCase(getAllSong.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypeState.Get
      })
    builder
      .addCase(deleteSong.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypeState.Delete
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.type = ETypeState.Delete

        const index = state.value.findIndex((x) => x.songId === action.payload.songId)
        state.value[index] = action.payload
        state.value = [...state.value]
      })
      .addCase(deleteSong.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypeState.Delete
      })
  },
})

export const {} = songSlice.actions

export const songStore = (state: RootState) => state.song

export default songSlice.reducer
