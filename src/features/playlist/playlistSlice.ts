import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import * as service from './playlistServiceX'
import { IPlaylist, IPlaylistCreate, IPlaylistUpdate, IPlaylistUpdateName } from '../../Interfaces/store/IPlaylist'

import { EStatusState, ETypePlaylistState } from '../../constants/common'
export interface ownerState {
  value: IPlaylist[]
  status: EStatusState
  type: ETypePlaylistState
}

const initialState: ownerState = {
  value: [],
  status: EStatusState.Idle,
  type: ETypePlaylistState.Get,
}
export const getAllPlaylist = createAsyncThunk('playlist/getAllPlaylist', async () => {
  let res = await service.getAllPlaylist()
  return res.data.data
})
export const deletePlaylist = createAsyncThunk('playlist/deletePlaylist', async (id: number) => {
  let res = await service.deletePlaylist(id)
  return res.data
})
export const createPlaylist = createAsyncThunk('playlist/createPlaylist', async (data: IPlaylistCreate) => {
  let res = await service.createPlaylist(data)
  return res.data
})
export const updatePlaylist = createAsyncThunk('playlist/updatePlaylist', async (data: IPlaylistUpdate) => {
  let res = await service.updatePlaylist(data)
  return res.data
})
export const updateIsPublicPlaylist = createAsyncThunk('playlist/updateIsPublicPlaylist', async (id: number) => {
  console.log(id)

  let res = await service.updateIsPublicPlaylist(id)
  console.log(res)

  return res.data
})
export const updateNamePlaylist = createAsyncThunk('playlist/updateNamePlaylist', async (data: IPlaylistUpdateName) => {
  let res = await service.updateNamePlaylist(data)
  return res.data
})
export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlaylist.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypePlaylistState.Get
      })
      .addCase(getAllPlaylist.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.value = action.payload //.map((x) => ({ ...x, _label: `${x.name} - ${x.id}` }))
        state.type = ETypePlaylistState.Get
      })
      .addCase(getAllPlaylist.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypePlaylistState.Get
      })

    // builder
    //   .addCase(deletePlaylist.pending, (state) => {
    //     state.status = EStatusState.Loading
    //     state.type = ETypePlaylistState.Delete
    //   })
    //   .addCase(deletePlaylist.fulfilled, (state, action) => {
    //     state.status = EStatusState.Success
    //     state.type = ETypePlaylistState.Delete
    //     const index = state.value.findIndex((x) => x.id === action.payload.id)
    //     state.value[index] = action.payload
    //     state.value = [...state.value]
    //   })
    //   .addCase(deletePlaylist.rejected, (state) => {
    //     state.status = EStatusState.Failed
    //     state.type = ETypePlaylistState.Delete
    //   })

    builder
      .addCase(createPlaylist.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypePlaylistState.Create
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.type = ETypePlaylistState.Create
        if (action.payload.isPublic) state.value = [...state.value, action.payload]
      })
      .addCase(createPlaylist.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypePlaylistState.Create
      })

    // builder
    //   .addCase(updatePlaylist.pending, (state) => {
    //     state.status = EStatusState.Loading
    //     state.type = ETypePlaylistState.Update
    //   })
    //   .addCase(updatePlaylist.fulfilled, (state, action) => {
    //     state.status = EStatusState.Success
    //     state.type = ETypePlaylistState.Update
    //     const index = state.value.findIndex((x) => x.id === action.payload.id)
    //     state.value[index] = action.payload
    //     state.value = [...state.value]
    //   })
    //   .addCase(updatePlaylist.rejected, (state) => {
    //     state.status = EStatusState.Failed
    //     state.type = ETypePlaylistState.Update
    //   })

    builder
      .addCase(updateNamePlaylist.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypePlaylistState.UpdateName
      })
      .addCase(updateNamePlaylist.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.type = ETypePlaylistState.UpdateName
        const index = state.value.findIndex((x) => x.playlistId === action.payload.playlistId)
        state.value[index] = action.payload
        state.value = [...state.value]
      })
      .addCase(updateNamePlaylist.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypePlaylistState.UpdateName
      })

    builder
      .addCase(updateIsPublicPlaylist.pending, (state) => {
        state.status = EStatusState.Loading
        state.type = ETypePlaylistState.UpdateIsPublic
      })
      .addCase(updateIsPublicPlaylist.fulfilled, (state, action) => {
        state.status = EStatusState.Success
        state.type = ETypePlaylistState.UpdateIsPublic
        const arr = state.value.filter((x) => x.playlistId !== action.payload.playlistId)
        state.value = [...arr]
      })
      .addCase(updateIsPublicPlaylist.rejected, (state) => {
        state.status = EStatusState.Failed
        state.type = ETypePlaylistState.UpdateIsPublic
      })
  },
})

export const {} = playlistSlice.actions

export const playlistStore = (state: RootState) => state.playlist

export default playlistSlice.reducer
