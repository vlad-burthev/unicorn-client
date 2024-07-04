import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { T_Provider } from "../interfaces";

export const electricityProvidersApi = createApi({
  reducerPath: "electricityProvidersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/electricity_providers/",
    credentials: "include",
  }),
  tagTypes: ["Provider"],
  endpoints: (builder) => ({
    getAllProvider: builder.query({
      query: () => "get_all",
      providesTags: ["Provider"],
    }),
    getOneProvider: builder.query({
      query: (id) => `get_one/${id}`,
      providesTags: ["Provider"],
    }),
    createProvider: builder.mutation({
      query: (providerData: T_Provider) => ({
        url: "create",
        method: "POST",
        body: providerData,
      }),
      invalidatesTags: ["Provider"],
    }),
    updateProvider: builder.mutation({
      query: ({ providerData, companyId }) => ({
        url: `update/${companyId}`,
        method: "POST",
        body: providerData,
      }),
      invalidatesTags: ["Provider"],
    }),
    deleteProvider: builder.mutation({
      query: (companyId) => ({
        url: `delete/${companyId}`,
        method: "POST",
      }),
      invalidatesTags: ["Provider"],
    }),
  }),
});

export const {
  useGetAllProviderQuery,
  useGetOneProviderQuery,
  useCreateProviderMutation,
  useUpdateProviderMutation,
  useDeleteProviderMutation,
} = electricityProvidersApi;
