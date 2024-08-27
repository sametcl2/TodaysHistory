import { GetOnThisDayAllTodayTypes } from 'types/onThisDayAllToday'
import { ToastType } from 'constants/toast'
import i18n from 'lang/i18n'
import { handleCreateToast } from 'utils/toast'
import { onThisDayApi } from '.'

type GetOnThisDayAllTodayReturnTypes = { month: string; day: string }

const extendedApi = onThisDayApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTypesToday: builder.query<GetOnThisDayAllTodayTypes, GetOnThisDayAllTodayReturnTypes>({
      query: ({ month, day }) => `onthisday/all/${month}/${day}`,
      async onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled
          .then(() => {
            handleCreateToast({
              title: i18n.t('http.success'),
              subTitle: i18n.t('messages.getAllTypesToday.success'),
              show: true,
              type: ToastType.Success
            })
          })
          .catch((_error) => {
            handleCreateToast({
              title: i18n.t('http.error'),
              subTitle: i18n.t('messages.getAllTypesToday.error'),
              show: true,
              type: ToastType.Error
            })
          })
      }
    })
  })
})

export const { useGetAllTypesTodayQuery } = extendedApi
