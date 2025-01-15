import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const requestsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.marketstack.com/v1/eod',
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ limit }) => ({
        method: 'get',
        url: `?access_key=d74202f81225b5631e505aff97275f88&symbols=AAPL&limit=${limit}`,
      }),
    }),
  }),
  reducerPath: 'requestsApi',
});
