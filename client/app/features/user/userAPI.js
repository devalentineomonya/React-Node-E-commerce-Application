import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { apiBaseUrl } from "../../../utils/apiUtils"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl:`${apiBaseUrl}/users`,
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userDataPayload) => ({
                url: "/add",
                method: "POST",
                body: userDataPayload
            })

        }),
        fetchUserData: builder.query({
            query: (userId) => {
                console.log(userId)
                return ({
              url: `/get/${userId}`, 
              method: 'GET',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
              },
            })},
          }),
    })



})
export const { useRegisterUserMutation, useFetchUserDataQuery} = userApi