import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseUrl } from '../../../utils/apiUtils';

export const productApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiBaseUrl}/products` }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/get',
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `products/get/${productId}`,
        method: "GET",
      })
    })
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;