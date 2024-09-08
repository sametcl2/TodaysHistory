import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { RootState } from './store'

const today = moment()

const day = today.format('D')
const month = today.format('M')
const displayValue = today.format('MMMM Do')

type InitialDateType = {
  currentDate: Date
  day?: string
  month?: string
  displayValue?: string
}

export const initialState: InitialDateType = {
  currentDate: today.toDate(),
  day,
  month,
  displayValue
}

const date = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setCurrentDate: (state, { payload }: PayloadAction<InitialDateType>) => {
      const selectedDate = moment(state.currentDate)
      const displayValue = selectedDate.format('MMMM Do')
      state.currentDate = payload.currentDate
      state.day = selectedDate.format('D')
      state.month = selectedDate.format('M')
      state.displayValue = displayValue
    }
  }
})

export const { setCurrentDate } = date.actions

export default date.reducer

export const selectCurrentDate = (state: RootState) => state.date
