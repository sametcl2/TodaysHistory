import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import i18next from 'i18next'

export const baseUrl = process.env.EXPO_PUBLIC_BASE_URL

export const customBaseQuery = (customBaseUrl?: string) => {
  const base: BaseQueryFn = async (args, api, extraOptions) => {
    const language = i18next.language

    if (!language) {
      return {
        error: {
          status: 400
        }
      }
    }

    const result = await fetchBaseQuery({
      baseUrl: customBaseUrl ?? `${baseUrl}/${language}/`
    })(args, api, extraOptions)

    return result
  }
  return base
}
