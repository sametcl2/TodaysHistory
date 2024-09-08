import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react'

export type LoaderPropsTypes = {
  error: FetchBaseQueryError | SerializedError | unknown
  isError: boolean
  isFetching: boolean
  onRefetch: () => void
}
