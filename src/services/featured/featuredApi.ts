import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import i18next from 'i18next';
import moment from 'moment';
import { FeaturedEventsTodayType } from 'types/api/featuredEventsToday';
import { featuredApi } from '.';

type FeaturedEventsTodayReturnType = { year: string; month: string; day: string };

const extendedApi = featuredApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedEventsToday: builder.query<FeaturedEventsTodayType, FeaturedEventsTodayReturnType>({
      query: ({ year, month, day }) => `featured/${year}/${month}/${day}`
    })
  })
});

export const { useGetFeaturedEventsTodayQuery } = extendedApi;
