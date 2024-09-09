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
    }
  }
})

export const { setCurrentFavorites } = favorites.actions

export default favorites.reducer

export const selectCurrentFavorites = (state: RootState) => state.favorites.currentFavorites
