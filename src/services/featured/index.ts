import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'services/base/customBaseQuery';

export const featuredApi = createApi({
  reducerPath: 'featuredApi',
  baseQuery: customBaseQuery(),
  endpoints: () => ({})
});
