import { store } from "../store";

//store
export type T_RootState = ReturnType<typeof store.getState>;
export type T_AppDispatch = typeof store.dispatch;

//userApi
export type T_UserAuthData = {
  email: string;
  password: string;
};

export type T_Provider = {
  _id: string;
  name: string;
  country: string;
  marketShare: number;
  renewableEnergyPercentage: number;
  yearlyRevenue: number;
};
