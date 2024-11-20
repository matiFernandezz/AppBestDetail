import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/dataBase"
;
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl:  process.env.EXPO_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    putProfilePicture: builder.mutation({
      query: ({ image,localId }) => ({
        url: `profilePictures/${localId}.json`,
        method: "PUT",
        body: {
            image:image
        }
      }),
    }),
    getProfilePicture: builder.query({
        query: (localId) => `profilePictures/${localId}.json`
    }),
    postUserLocation: builder.mutation({
      query: ({location, localId}) => ({
        url: `locations/${localId}.json`,
        method: "PUT",
        body: {
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address,
        }
      }),
    }),
    getUserLocation: builder.query({
      query: (localId) => `locations/${localId}.json`, 
    }),
  })
});
export const { usePutProfilePictureMutation, useGetProfilePictureQuery, usePostUserLocationMutation, useGetUserLocationQuery } = userApi;