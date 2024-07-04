import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { T_UserAuthData } from "../interfaces";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "api/user/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<string, T_UserAuthData>({
      query: (userLoginData) => ({
        url: "login",
        method: "POST",
        body: userLoginData,
      }),
    }),
    registration: builder.mutation<string, T_UserAuthData>({
      query: (userRegData) => ({
        url: "registration",
        method: "POST",
        body: userRegData,
      }),
    }),
    checkAuth: builder.mutation({
      query: () => ({
        url: "check",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useCheckAuthMutation,
} = userApi;
