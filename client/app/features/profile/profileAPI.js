import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => '/addresses',
    }),
   
  }),
});

export const { useGetAddressesQuery } = profileApi;
