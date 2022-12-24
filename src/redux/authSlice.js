import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import db from "../firebase/config";

const initialAuthState = {
  login: "",
  email: "",
  password: "",
  isAuth: false,

  uid: null,
  // nickName: null,
  // stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logIn(state, action) {
      console.log("logIn");
      const { email, password } = action.payload;
      state.login = "Login Name";
      state.email = email != "" ? email : "Login Email";
      state.password = password;
      state.isAuth = true;
    },
    regIn(state, action) {
      console.log("regIn");
      const { login, email, password } = action.payload;
      state.login = login != "" ? login : "Regist Name";
      state.email = email != "" ? email : "Regist Email";
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
    updateUserProfile: (state, { payload }) => ({
      ...state,
      uid: payload.uid,
      login: payload.login,
      email: payload.email,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      isAuth: payload.isAuth,
    }),
    authSignOut: () => state,
  },
});

export const { logIn, regIn, logOut } = authSlice.actions;
export const selectIsAuth = (store) => store.auth.isAuth;
export const selectLogin = (store) => store.auth.login;
export const selectEmail = (store) => store.auth.email;

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);

      console.log("userUp", user);

      // const user = await db.auth().currentUser;
      if (user) {
        await user.updateProfile({
          displayName: login,
          //photoURL: "https://example.com.jpg",
        });

        const userUpdateProfile = {
          uid: user.uid,
          login: user.displayName,
          email: user.email,
        };

        dispatch(updateUserProfile(userUpdateProfile));
        dispatch(authStateChange({ isAuth: true }));
      }
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await db
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log("userIN", user);
      console.log(user.email);
      if (user) {
        const userUpdateProfile = {
          uid: user.uid,
          login: user.displayName,
          email: user.email,
        };
        dispatch(updateUserProfile(userUpdateProfile));
        dispatch(authStateChange({ isAuth: true }));
      }
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  // dispatch(authSignOut());
  dispatch(authStateChange({ isAuth: false }));
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    console.log("authStateChangeUser", user);
    if (user) {
      const userUpdateProfile = {
        uid: user.uid,
        login: user.displayName,
        email: user.email,
      };

      dispatch(authStateChange({ isAuth: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
