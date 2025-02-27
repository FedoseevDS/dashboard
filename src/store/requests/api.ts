import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const requestsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ params, url }) => ({
        params,
        url,
      }),
    }),
  }),
  reducerPath: 'requestsApi',
});
