import { GetOnThisDayAllTodayTypes } from 'types/onThisDayAllToday'
import { showToast } from 'store/toast'
import { ToastType } from 'constants/toast'
import i18n from 'lang/i18n'
import { onThisDayApi } from '.'

type GetOnThisDayAllTodayReturnTypes = { month: string; day: string }

const extendedApi = onThisDayApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTypesToday: builder.query<GetOnThisDayAllTodayTypes, GetOnThisDayAllTodayReturnTypes>({
      query: ({ month, day }) => `onthisday/all/${month}/${day}`,
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        queryFulfilled
          .then(() => {
            dispatch(
              showToast({
                title: i18n.t('http.success'),
                subTitle: i18n.t('messages.getOnThisDayAll.success'),
                showToast: true,
                type: ToastType.SUCCESS
              })
            )
          })
          .catch((_error) => {
            dispatch(
              showToast({
                title: i18n.t('http.error'),
                subTitle: i18n.t('messages.getOnThisDayAll.fail'),
                showToast: true,
                type: ToastType.ERROR
              })
            )
          })
      }
    })
  })
})

export const { useGetAllTypesTodayQuery } = extendedApi
