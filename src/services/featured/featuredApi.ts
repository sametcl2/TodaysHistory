import { GetFeaturedEventsTodayType } from 'types/featuredEventsToday'
import { featuredApi } from '.'

type GetFeaturedEventsTodayReturnType = { year: string; month: string; day: string }

const extendedApi = featuredApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedEventsToday: builder.query<GetFeaturedEventsTodayType, GetFeaturedEventsTodayReturnType>({
      query: ({ year, month, day }) => `featured/${year}/${month}/${day}`,
      async onQueryStarted(_, { queryFulfilled, dispatch: _dispatch }) {
        queryFulfilled
          .then(() => {
            // Dispatch to toast slice inside handleCreateToast (store.dispatch)
            // handleCreateToast({
            //   type: 'success',
            //   title: i18n.t('success'),
            //   subtitle: i18n.t('messages.getFeaturedEventsToday.success')
            // })
          })
          .catch((_error) => {
            // Dispatch to toast slice
            // handleCreateToast({
            //   type: 'error',
            //   title: error,
            //   subtitle: i18n.t('messages.getFeaturedEventsToday.error')
            // })
          })
      }
    })
  })
})

export const { useGetFeaturedEventsTodayQuery } = extendedApi
