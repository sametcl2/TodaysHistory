import { createSlice } from '@reduxjs/toolkit'

import { ToastTypes } from 'types/toast'
// eslint-disable-next-line import/no-cycle
import { RootState } from './store'

type initialStateType = {
  title: string
  subTitle: string
  show: boolean
  type?: ToastTypes
}

export const initialState: initialStateType = {
  title: '',
  subTitle: '',
  show: false,
  type: undefined
}

const toast = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showToast: (state, { payload }) => {
      state.title = payload.title
      state.subTitle = payload.subTitle
      state.show = payload.show
      state.type = payload.type
    },
    hideToast: (state) => {
      state.title = ''
      state.subTitle = ''
      state.show = false
      state.type = undefined
    }
  }
})

export const { showToast, hideToast } = toast.actions

export default toast.reducer

export const selectToast = (state: RootState) => state.toast
