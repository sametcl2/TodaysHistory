/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { SupportedLanguages } from 'constants/language'

export const initialState: {
  currentlanguage: SupportedLanguages
} = {
  currentlanguage: SupportedLanguages.ENGLISH
}

const language = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setCurrentLanguage: (state, { payload: currentlanguage }: PayloadAction<SupportedLanguages>) => {
      state.currentlanguage = currentlanguage
    }
  }
})

export const { setCurrentLanguage } = language.actions

export default language.reducer

export const selectCurrentLanguage = (state: RootState) => state.language.currentlanguage
