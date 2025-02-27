import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const requestsApi = createApi({
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getDataBinance: builder.query({
      query: () => ({
        method: 'get',
        params: { interval: '1d', limit: 100, symbol: 'BTCUSDT' },
        url: `https://api.binance.com/api/v3/klines`,
      }),
    }),
    getDataMobula: builder.query({
      query: () => ({
        method: 'get',
        params: { amount: 100, asset: 'Bitcoin', period: '1d' },
        url: `https://production-api.mobula.io/api/1/market/history/pair`,
      }),
    }),
  }),
  reducerPath: 'requestsApi',
});
