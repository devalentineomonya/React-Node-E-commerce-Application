
import { createApi ,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../../utils/apiUtils";

export const brandApi = createApi({
    reducerPath: "brandApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiBaseUrl}/brands`
    }),
    endpoints: (builder) => ({
        getAllBrands: builder.query({
            query: () => "/get"
        })
    })
})

export const {useGetAllBrandsQuery} = brandApi