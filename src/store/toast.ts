import { createSlice } from '@reduxjs/toolkit'
import { ToastType } from 'constants/toast'
// eslint-disable-next-line import/no-cycle
import { RootState } from './store'

type initialStateType = {
  title: string
  subTitle: string
  showToast: boolean
  type: ToastType | null
}

export const initialState: initialStateType = {
  title: '',
  subTitle: '',
  showToast: false,
  type: null
}

const toast = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showToast: (state, { payload }) => {
      state.title = payload.title
      state.subTitle = payload.subTitle
      state.showToast = payload.showToast
      state.type = payload.type
    },
    hideToast: (state) => {
      state.title = ''
      state.subTitle = ''
      state.showToast = false
      state.type = null
    }
  }
})

export const { showToast, hideToast } = toast.actions

export default toast.reducer

export const selectToast = (state: RootState) => state.toast
