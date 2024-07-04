import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { userApi } from "../api/userApi";
import { electricityProvidersApi } from "../api/electricityProvidersApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) =>
    gDM().concat(userApi.middleware, electricityProvidersApi.middleware),
});
