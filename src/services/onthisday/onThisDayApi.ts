import { GetOnThisDayAllTodayTypes } from 'types/onThisDayAllToday'
import { onThisDayApi } from '.'

type GetOnThisDayAllTodayReturnTypes = { month: string; day: string }

const extendedApi = onThisDayApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTypesToday: builder.query<GetOnThisDayAllTodayTypes, GetOnThisDayAllTodayReturnTypes>({
      query: ({ month, day }) => `onthisday/all/${month}/${day}`
    })
  })
})

export const { useGetAllTypesTodayQuery } = extendedApi
