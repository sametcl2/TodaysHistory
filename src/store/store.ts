/* eslint-disable import/no-cycle */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { featuredApi } from 'services/featured'
import { onThisDayApi } from 'services/onThisDay'
import toast from './toast'
import language from './language'
import data from './data'
import date from './date'
import favorites from './favorites'

const combinedReducer = combineReducers({
  language,
  toast,
  data,
  date,
  favorites,
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

const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export { useAppDispatch as useDispatch }
export { useAppSelector as useSelector }
