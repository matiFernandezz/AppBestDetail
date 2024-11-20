import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl:  process.env.EXPO_PUBLIC_BASE_URL }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories.json'
        }),
        getProducts: builder.query({
            query: ()=>'products.json'
        }),
        getProductsByCategory: builder.query({
            query: (category)=>{
                
                return(
                `products.json?orderBy="category"&equalTo="${category}"` 
            )},
            transformResponse: (response) => (
                response ? Object.values(response) : []
            )
        }),
        getProduct: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => (
                response ? Object.values(response)[0] : null
            )
        })
    })
})
export const { useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductsQuery, useGetProductQuery } = shopApi;