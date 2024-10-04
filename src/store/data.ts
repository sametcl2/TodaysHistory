/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './setup/store'

type InitialStateType = {
  currentPages: [{ url: string; title: string }] | []
}

export const initialState: InitialStateType = {
  currentPages: []
}

const data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCurrentPages: (state, { payload }) => {
      state.currentPages = payload
    }
  }
})

export const { setCurrentPages } = data.actions

export default data.reducer

export const selectCurrentPages = (state: RootState) => state.data.currentPages
