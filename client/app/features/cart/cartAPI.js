import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseUrl } from '../../../utils/apiUtils';

const getToken = () => localStorage.getItem('token');

export const cartApi = createApi({
  reducerPath: 'cartAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiBaseUrl}/cart`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: '/get',
        method: 'GET',
      }),
    }),
    addToCart: builder.mutation({
      query: (productId) => ({
        url: '/add',
        method: 'POST',
        body: { productId },
      }),
    }),
    incrementQuantity: builder.mutation({
      query: (productId) => ({
        url: `/increment/${productId}`,
        method: 'PUT',
      }),
    }),
    decrementQuantity: builder.mutation({
      query: (productId) => ({
        url: `/decrement/${productId}`,
        method: 'PUT',
      }),
    }),
    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/delete/${productId}`,
        method: 'DELETE',
      }),
    }),
    syncCart: builder.mutation({
      query: (cartItems) => ({
        url: '/sync', 
        method: 'POST',
        body: { cartItems },
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useIncrementQuantityMutation,
  useDecrementQuantityMutation,
  useRemoveFromCartMutation,
  useSyncCartMutation, 
} = cartApi;
