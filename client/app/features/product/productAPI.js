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
      query: (productId) => `/get/${productId}`,
    }),
    addViewedProduct: builder.mutation({
      query:(productId) =>({
        url: '/addView',
        method:"PUT",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        },
        body:{productId}
      })
    }),
    setProductLike: builder.mutation({
      query: (productId)  =>({
        url: '/setLike',
        method:"PUT",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        },
        body: { productId },
      })
    })
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery,useSetProductLikeMutation,useAddViewedProductMutation } = productApi;
