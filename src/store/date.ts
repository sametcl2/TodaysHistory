import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { RootState } from './setup/store'

const today = moment()

const day = today.date().toString()
const month = (today.month() + 1).toString()
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
      const selectedDate = moment(payload.currentDate)
      const displayValue = selectedDate.format('MMMM Do')
      state.currentDate = selectedDate.toDate()
      state.day = selectedDate.date().toString()
      state.month = (selectedDate.month() + 1).toString()
      state.displayValue = displayValue
    }
  }
})

export const { setCurrentDate } = date.actions

export default date.reducer

export const selectCurrentDate = (state: RootState) => state.date
