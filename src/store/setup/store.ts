/* eslint-disable import/no-cycle */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { featuredApi } from 'services/featured'
import { onThisDayApi } from 'services/onThisDay'
import data from 'store/data'
import date from 'store/date'
import favorites from 'store/favorites'
import language from 'store/language'
import toast from 'store/toast'
import viewType from 'store/viewType'

const combinedReducer = combineReducers({
  language,
  toast,
  data,
  date,
  favorites,
  viewType,
  [featuredApi.reducerPath]: featuredApi.reducer,
  [onThisDayApi.reducerPath]: onThisDayApi.reducer
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: any) => combinedReducer(state, action)

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.EXPO_PUBLIC_APP_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
      .concat(featuredApi.middleware)
      .concat(onThisDayApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
