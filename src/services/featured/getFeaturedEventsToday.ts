import { GetFeaturedEventsTodayType } from 'types/featuredEventsToday'
import { showToast } from 'store/toast'
import i18n from 'lang/i18n'
import { ToastType } from 'constants/toast'
import { featuredApi } from '.'

type GetFeaturedEventsTodayReturnType = { year: string; month: string; day: string }

const extendedApi = featuredApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedEventsToday: builder.query<GetFeaturedEventsTodayType, GetFeaturedEventsTodayReturnType>({
      query: ({ year, month, day }) => `featured/${year}/${month}/${day}`,
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        queryFulfilled
          .then(() => {
            dispatch(
              showToast({
                title: i18n.t('http.success'),
                subTitle: i18n.t('messages.getFeaturedEventsToday.success'),
                showToast: true,
                type: ToastType.Success
              })
            )
          })
          .catch((_error) => {
            dispatch(
              showToast({
                title: i18n.t('http.success'),
                subTitle: i18n.t('messages.getFeaturedEventsToday.error'),
                showToast: true,
                type: ToastType.Error
              })
            )
          })
      }
    })
  })
})

export const { useGetFeaturedEventsTodayQuery } = extendedApi
