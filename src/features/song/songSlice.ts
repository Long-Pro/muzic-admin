import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import * as service from './songService'
import { ISong, ISongCreate, ISongUpdate } from '../../Interfaces/store/ISong'

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
  return (res.data as any).data
})
export const toggleIsDeleteSong = createAsyncThunk('song/toggleIsDeleteSong', async (id: number) => {
  let res = await service.toggleIsDeleteSong(id)
  return res.data
})
export const createSong = createAsyncThunk('song/createSong', async (data: ISongCreate) => {
  let res = await service.createSong(data)
  return res.data
})
export const updateSong = createAsyncThunk('song/updateSong', async (data: ISongUpdate) => {
  let res = await service.updateSong(data)
  return res.data
})

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = EStatusState.Idle
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSong.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypeState.Get
      })
      .addCase(getAllSong.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        //state.value = action.payload
        state.value = action.payload.map((x: ISong) => ({ ...x, _label: `${x.name} - ${x.songId}` }))
        state.type = ETypeState.Get
      })
      .addCase(getAllSong.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypeState.Get
      })
    builder
      .addCase(toggleIsDeleteSong.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypeState.ToggleIsDelete
      })
      .addCase(toggleIsDeleteSong.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.type = ETypeState.ToggleIsDelete

        const index = state.value.findIndex((x) => x.songId === action.payload.songId)
        state.value[index] = action.payload
        state.value = [...state.value]
      })
      .addCase(toggleIsDeleteSong.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypeState.ToggleIsDelete
      })
    builder
      .addCase(createSong.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypeState.Create
      })
      .addCase(createSong.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.type = ETypeState.Create
        state.value = [...state.value, action.payload]
      })
      .addCase(createSong.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypeState.Create
      })
    builder
      .addCase(updateSong.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypeState.Update
      })
      .addCase(updateSong.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.type = ETypeState.Update

        const index = state.value.findIndex((x) => x.songId === action.payload.songId)
        state.value[index] = action.payload
        state.value = [...state.value]
      })
      .addCase(updateSong.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypeState.Update
      })
  },
})

export const { resetStatus } = songSlice.actions

export const songStore = (state: RootState) => state.song

export default songSlice.reducer
