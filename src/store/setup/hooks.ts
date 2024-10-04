import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`

// this file automatically types state and dispatch
const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export { useAppDispatch as useDispatch }
export { useAppSelector as useSelector }
