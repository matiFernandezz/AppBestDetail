import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
    endpoints: (builder) => ({ 
        postOrder: builder.mutation({
            query: (...order) => ({
                url: 'order.json',
                method: 'POST',
                body: order
            })
        }),
        getOrders: builder.query({
            query: ()=>'order.json',
            transformResponse: (response) =>
                response
                  ? Object.entries(response).flatMap(([id, orders]) =>
                      orders.map(order => ({ id, ...order }))
                    )
                  : [],
        }),


    })
})
export const { usePostOrderMutation , useGetOrdersQuery} = orderApi;

