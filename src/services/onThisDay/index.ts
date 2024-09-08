import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from 'services/base/customBaseQuery'

export const onThisDayApi = createApi({
  reducerPath: 'onThisDayApi',
  baseQuery: customBaseQuery(),
  endpoints: () => ({})
})
