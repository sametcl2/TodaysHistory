import { OnThisDayAllTodayType } from 'types/onThisDayAllToday'
import i18n from 'lang/i18n'
import { handleCreateToast } from 'utils/toast'
import { onThisDayApi } from '.'

type GetAllEventsTodayResponseType = {
  month: string
  day: string
}

type GetAllEventsTodayRequestType = OnThisDayAllTodayType

const extendedApi = onThisDayApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEventsToday: builder.query<GetAllEventsTodayRequestType, GetAllEventsTodayResponseType>({
      query: ({ month, day }) => `onthisday/all/${month}/${day}`,
      async onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled.catch((_error) => {
          handleCreateToast({
            title: i18n.t('http.error'),
            subTitle: i18n.t('messages.getAllEventsToday.error'),
            show: true,
            type: 'error'
          })
        })
      }
    })
  })
})

export const { useGetAllEventsTodayQuery } = extendedApi
