import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface I_InitialState {
  isLogin: boolean;
  email: null | string;
}

const initialUserState: I_InitialState = {
  isLogin: false,
  email: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: initialUserState,
  reducers: {
    setLoginUser: (state) => {
      state.isLogin = true;
    },
    setLogoutUser: (state) => {
      state.isLogin = false;
      state.email = null;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setLoginUser, setLogoutUser, setEmail } = userSlice.actions;
