// src/features/profile/profileAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => '/addresses',
    }),
    // Add more endpoints here
  }),
});

export const { useGetAddressesQuery } = profileApi;
