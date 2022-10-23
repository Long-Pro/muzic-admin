import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import * as service from './artistService'
import { IArtist, IArtistCreate, IArtistUpdate } from '../../Interfaces/store/IArtist'

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
export const createArtist = createAsyncThunk('artist/createArtist', async (data: IArtistCreate) => {
  let res = await service.createArtist(data)
  console.log(res)
  return res.data
})
export const updateArtist = createAsyncThunk('artist/updateArtist', async (data: IArtistUpdate) => {
  let res = await service.updateArtist(data)
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
        state.value = action.payload.map((x) => ({ ...x, _label: `${x.name} - ${x.id}` }))
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
    builder
      .addCase(createArtist.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypeState.Create
      })
      .addCase(createArtist.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.type = ETypeState.Create
        state.value = [...state.value, action.payload]
      })
      .addCase(createArtist.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypeState.Create
      })
    builder
      .addCase(updateArtist.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypeState.Update
      })
      .addCase(updateArtist.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.type = ETypeState.Update

        const index = state.value.findIndex((x) => x.id === action.payload.id)
        state.value[index] = action.payload
        state.value = [...state.value]
      })
      .addCase(updateArtist.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypeState.Update
      })
  },
})

export const {} = artistSlice.actions

export const artistStore = (state: RootState) => state.artist

export default artistSlice.reducer
