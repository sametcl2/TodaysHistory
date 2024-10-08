import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { FavoriteType } from 'types/favorite'

export const initialState: {
  currentFavorites: FavoriteType[]
} = {
  currentFavorites: []
}

const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setCurrentFavorites: (state, { payload: currentFavorites }: PayloadAction<FavoriteType[]>) => {
      state.currentFavorites = currentFavorites
    },
    clearCurrentFavorites: (state) => {
      state.currentFavorites = []
    }
  }
})

export const { setCurrentFavorites, clearCurrentFavorites } = favorites.actions

export default favorites.reducer

export const selectCurrentFavorites = (state: RootState) => state.favorites.currentFavorites
