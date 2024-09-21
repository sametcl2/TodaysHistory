import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { ViewTypes } from 'constants/view'

export const initialState: {
  selectedViewType: ViewTypes
} = {
  selectedViewType: ViewTypes.List
}

const viewType = createSlice({
  name: 'viewType',
  initialState,
  reducers: {
    setCurrentViewType: (state, { payload: selectedViewType }: PayloadAction<ViewTypes>) => {
      state.selectedViewType = selectedViewType
    }
  }
})

export const { setCurrentViewType } = viewType.actions

export default viewType.reducer

export const selectCurrentViewType = (state: RootState) => state.viewType.selectedViewType
