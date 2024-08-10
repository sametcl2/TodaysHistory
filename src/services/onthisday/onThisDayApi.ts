import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import i18next from 'i18next';
import moment from 'moment';
import { OnThisDayAllTodayTypes } from 'types/api/onThisDayAllToday';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export const onThisDayApi = createApi({
  reducerPath: 'onThisDayApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllTypesToday: builder.query<OnThisDayAllTodayTypes, void>({
      query: () => {
        const language = i18next.language;
        const month = moment().format('MM');
        const day = moment().format('DD');
        return `${language}/onthisday/all/${month}/${day}`;
      }
    })
  })
});

export const { useGetAllTypesTodayQuery } = onThisDayApi;
