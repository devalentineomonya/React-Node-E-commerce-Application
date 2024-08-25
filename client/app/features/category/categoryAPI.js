import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../../utils/apiUtils";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiBaseUrl}/categories`
    }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "/get"
        })
    })
})
export const {useGetCategoriesQuery} = categoryApi