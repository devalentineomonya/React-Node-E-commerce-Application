import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
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
