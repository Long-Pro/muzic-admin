import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import * as service from './artistService'
import { IArtist } from '../../Interfaces/store/IArtist'

import { EStatusState, ETypeState } from '../../constants/common'
export interface ownerState {
  value: IArtist[]
  status: EStatusState
  type: ETypeState
}

const initialState: ownerState = {
  value: [],
  status: EStatusState.Idle,
  type: ETypeState.Get,
}
export const getAllArtist = createAsyncThunk('artist/getAllArtist', async () => {
  let res = await service.getAllArtist()
  console.log(res)
  return res.data
})
export const deleteArtist = createAsyncThunk('artist/deleteArtist', async (id: number) => {
  let res = await service.deleteArtist(id)
  console.log(res)
  return res.data
})

export const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllArtist.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypeState.Get
      })
      .addCase(getAllArtist.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.value = action.payload
        state.type = ETypeState.Get
      })
      .addCase(getAllArtist.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypeState.Get
      })
    builder
      .addCase(deleteArtist.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypeState.Delete
      })
      .addCase(deleteArtist.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.type = ETypeState.Delete

        const index = state.value.findIndex((x) => x.id === action.payload.id)
        state.value[index] = action.payload
        state.value = [...state.value]
      })
      .addCase(deleteArtist.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypeState.Delete
      })
  },
})

export const {} = artistSlice.actions

export const artistStore = (state: RootState) => state.artist

export default artistSlice.reducer
