import { GetFeaturedEventsTodayType } from 'types/featuredEventsToday'
import { showToast } from 'store/toast'
import i18n from 'lang/i18n'
import { featuredApi } from '.'

type GetFeaturedEventsTodayResponseType = {
  year: string
  month: string
  day: string
}

type GetFeaturedEventsTodayRequestType = GetFeaturedEventsTodayType

const extendedApi = featuredApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedEventsToday: builder.query<GetFeaturedEventsTodayRequestType, GetFeaturedEventsTodayResponseType>({
      query: ({ year, month, day }) => `featured/${year}/${month}/${day}`,
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        queryFulfilled
          .then(() => {
            dispatch(
              showToast({
                title: i18n.t('http.success'),
                subTitle: i18n.t('messages.getFeaturedEventsToday.success'),
                show: true,
                type: 'success'
              })
            )
          })
          .catch((_error) => {
            dispatch(
              showToast({
                title: i18n.t('http.success'),
                subTitle: i18n.t('messages.getFeaturedEventsToday.error'),
                show: true,
                type: 'error'
              })
            )
          })
      }
    })
  })
})

export const { useGetFeaturedEventsTodayQuery } = extendedApi
