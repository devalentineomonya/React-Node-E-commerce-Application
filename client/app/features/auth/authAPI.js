import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/auth', // Dynamically set the base URL
  }),
  endpoints: (builder) => ({
    loginWithPassword: builder.mutation({
      query: (credentials) => ({
        url: '/loginWithPassword',
        method: 'POST',
        body: credentials,
      }),
    }),

    loginWithGoogle: builder.query({
      query: () => ({
        url: '/loginWithGoogle',
        method: 'GET',
      }),
    }),

    logout: builder.mutation({
      query: (userToken) => ({
        url: '/logout',
        method: 'DELETE',
        body: userToken,
      }),
    }),

    requestPasswordReset: builder.mutation({
      query: (userDataPayload) => ({
        url: '/getpasswordresetcode',
        method: 'POST', // Changed to POST
        body: userDataPayload,
      }),
    }),

    resetPassword: builder.mutation({
      query: (userDataPayload) => ({
        url: '/resetpassword',
        method: 'POST', // Changed to POST
        body: userDataPayload,
      }),
    }),

    resendVerificationCode: builder.mutation({
      query: (userDataPayload) => ({
        url: '/resendcode',
        method: 'POST', // Changed to POST
        headers: {
          Authorization: `Bearer ${userDataPayload.token}`,
        },
        body: userDataPayload,
      }),
    }),

    verifyWithToken: builder.mutation({
      query: (userDataPayload) => ({
        url: `/verify?token=${userDataPayload.token}&userId=${userDataPayload.userId}`,
        method: 'GET',
      }),
    }),

    verifyWithCode: builder.mutation({
      query: (userDataPayload) => ({
        url: '/verify',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userDataPayload.token}`,
        },
        body: userDataPayload,
      }),
    }),
  }),
});

export const {
  useLoginWithPasswordMutation,
  useLoginWithGoogleQuery,
  useLogoutMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useResendVerificationCodeMutation,
  useVerifyWithTokenMutation,
  useVerifyWithCodeMutation,
} = authApi;