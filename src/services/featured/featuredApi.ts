import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import i18next from 'i18next';
import moment from 'moment';
import { FeaturedEventsTodayType } from 'types/api/featuredEventsToday';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export const featuredApi = createApi({
  reducerPath: 'featuredApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getFeaturedEventsToday: builder.query<FeaturedEventsTodayType, void>({
      query: () => {
        const language = i18next.language;
        const year = moment().format('YYYY');
        const month = moment().format('MM');
        const day = moment().format('DD');
        return `${language}/featured/${year}/${month}/${day}`;
      }
    })
  })
});

export const { useGetFeaturedEventsTodayQuery } = featuredApi;
