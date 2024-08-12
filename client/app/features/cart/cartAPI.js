import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartAPI = createApi({
  reducerPath: 'cartAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), 
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => 'cart', 
    }),
    addToCart: builder.mutation({
      query: (item) => ({
        url: 'cart',
        method: 'POST',
        body: item,
      }),
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: 'DELETE',
      }),
    }),
    updateQuantity: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `cart/${id}`,
        method: 'PATCH',
        body: { quantity },
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useUpdateQuantityMutation } = cartAPI;
