import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import ownerReducer from '../features/owner/ownerSlice'
import appReducer from '../features/app/appSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    owner: ownerReducer,
    app: appReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
