import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/users",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userDataPayload) => ({
                url: "/add",
                method: "POST",
                body: userDataPayload
            })

        })
    })



})
export const { useRegisterUserMutation} = userApi