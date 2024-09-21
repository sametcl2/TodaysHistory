import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ToastTypes } from 'types/toast'
// eslint-disable-next-line import/no-cycle
import { RootState } from './store'

type InitialStateType = {
  title: string
  subTitle: string
  show: boolean
  type?: ToastTypes
  duration?: number
}

export const initialState: InitialStateType = {
  title: '',
  subTitle: '',
  show: false,
  type: undefined
}

const toast = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showToast: (state, { payload }: PayloadAction<InitialStateType>) => {
      state.title = payload.title
      state.subTitle = payload.subTitle
      state.show = payload.show
      state.type = payload.type
      state.duration = payload.duration
    },
    hideToast: (state) => {
      state.title = ''
      state.subTitle = ''
      state.show = false
      state.type = undefined
      state.duration = undefined
    }
  }
})

export const { showToast, hideToast } = toast.actions

export default toast.reducer

export const selectToast = (state: RootState) => state.toast
