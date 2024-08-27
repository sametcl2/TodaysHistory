import { OnThisDayAllTodayType } from 'types/onThisDayAllToday'
import i18n from 'lang/i18n'
import { handleCreateToast } from 'utils/toast'
import { onThisDayApi } from '.'

type GetOnThisDayAllTodayResponseType = {
  month: string
  day: string
}

type GetOnThisDayAllTodayRequestType = OnThisDayAllTodayType

const extendedApi = onThisDayApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTypesToday: builder.query<GetOnThisDayAllTodayRequestType, GetOnThisDayAllTodayResponseType>({
      query: ({ month, day }) => `onthisday/all/${month}/${day}`,
      async onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled
          .then(() => {
            handleCreateToast({
              title: i18n.t('http.success'),
              subTitle: i18n.t('messages.getAllTypesToday.success'),
              show: true,
              type: 'success'
            })
          })
          .catch((_error) => {
            handleCreateToast({
              title: i18n.t('http.error'),
              subTitle: i18n.t('messages.getAllTypesToday.error'),
              show: true,
              type: 'error'
            })
          })
      }
    })
  })
})

export const { useGetAllTypesTodayQuery } = extendedApi
