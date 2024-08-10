import { OnThisDayAllTodayTypes } from 'types/api/onThisDayAllToday';
import { onThisDayApi } from '.';

type OnThisDayAllTodayReturnTypes = { month: string; day: string };

const extendedApi = onThisDayApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTypesToday: builder.query<OnThisDayAllTodayTypes, OnThisDayAllTodayReturnTypes>({
      query: ({ month, day }) => `onthisday/all/${month}/${day}`
    })
  })
});

export const { useGetAllTypesTodayQuery } = extendedApi;
