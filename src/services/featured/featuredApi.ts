import { GetFeaturedEventsTodayType } from 'types/featuredEventsToday'
import { featuredApi } from '.'

type GetFeaturedEventsTodayReturnType = { year: string; month: string; day: string }

const extendedApi = featuredApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedEventsToday: builder.query<GetFeaturedEventsTodayType, GetFeaturedEventsTodayReturnType>({
      query: ({ year, month, day }) => `featured/${year}/${month}/${day}`
    })
  })
})

export const { useGetFeaturedEventsTodayQuery } = extendedApi
