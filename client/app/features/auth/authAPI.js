import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseUrl } from '../../../utils/apiUtils';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiBaseUrl}/auth`,
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
      query: () => ({
        url: '/logout',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }),
    }),

    requestPasswordReset: builder.mutation({
      query: (userDataPayload) => ({
        url: '/getpasswordresetcode',
        method: 'POST',
        body: userDataPayload,
      }),
    }),

    resetPassword: builder.mutation({
      query: (userDataPayload) => ({
        url: '/resetpassword',
        method: 'POST',
        body: userDataPayload,
      }),
    }),

    resendVerificationCode: builder.mutation({
      query: () => ({
        url: '/resendcode',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
     
      }),
    }),

    verifyWithToken: builder.mutation({
      query: (userDataPayload) => ({
        url: `/verify?token=${userDataPayload.token}&userId=${userDataPayload.userId}`,
        method: 'GET',
      }),
    }),

    verifyWithCode: builder.mutation({
      query: (verificationCode) => ({
        url: '/verify',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: verificationCode,
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
