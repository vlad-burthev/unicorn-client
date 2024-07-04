import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice/userSlice";
import { userApi } from "../api/userApi";
import { electricityProvidersApi } from "../api/electricityProvidersApi";
import { modalSlice } from "./modalSlice/modalSlice";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  modals: modalSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [electricityProvidersApi.reducerPath]: electricityProvidersApi.reducer,
});
