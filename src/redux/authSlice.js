import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialAuthState = {
  login: "",
  email: "",
  password: "",
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logIn(state, action) {
      console.log("logIn");
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
      state.isAuth = true;
    },
    regIn(state, action) {
      console.log("regIn");
      const { login, email, password } = action.payload;
      state.login = login;
      state.email = email;
      state.password = password;
      state.isAuth = true;
    },
    logOut(state, _) {
      console.log("logOut");
      state.login = "";
      state.email = "";
      state.password = "";
      state.isAuth = false;
    },
  },
});

export const { logIn, regIn, logOut } = authSlice.actions;
export const selectIsAuth = (store) => store.auth.isAuth;
export const selectEmail = (store) => store.auth.email;
