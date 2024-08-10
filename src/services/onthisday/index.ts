import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'services/base/customBaseQuery';

export const onThisDayApi = createApi({
  reducerPath: 'onThisDayApi',
  baseQuery: customBaseQuery(),
  endpoints: () => ({})
});
