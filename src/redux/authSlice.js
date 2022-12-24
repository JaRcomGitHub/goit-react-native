import { createSlice } from "@reduxjs/toolkit";
// import db from "../firebase/config";

const initialAuthState = {
  login: "",
  email: "",
  password: "",
  isAuth: false,

  userId: null,
  nickName: null,
  stateChange: false,
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
    // updateUserProfile: (state, { payload }) => ({
    //   ...state,
    //   userId: payload.userId,
    //   nickName: payload.nickName,
    // }),
    // authStateChange: (state, { payload }) => ({
    //   ...state,
    //   stateChange: payload.stateChange,
    // }),
    // authSignOut: () => state,
  },
});

export const { logIn, regIn, logOut } = authSlice.actions;
export const selectIsAuth = (store) => store.auth.isAuth;
export const selectLogin = (store) => store.auth.login;
export const selectEmail = (store) => store.auth.email;

// const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

// export const authSignUpUser =
//   ({ email, password, nickname }) =>
//   async (dispatch, getState) => {
//     try {
//       await db.auth().createUserWithEmailAndPassword(email, password);

//       const user = await db.auth().currentUser;

//       // if (user) {
//       await user.updateProfile({
//         displayName: nickname,
//         // displayName: "Bob",
//         // photoURL: "https://example.com.jpg",
//       });
//       // }

//       const { displayName, uid } = await db.auth().currentUser;

//       const userUpdateProfile = {
//         nickName: displayName,
//         userId: uid,
//       };

//       dispatch(updateUserProfile(userUpdateProfile));
//     } catch (error) {
//       console.log("error", error);

//       console.log("error.message", error.message);
//     }
//   };

// export const authSignInUser =
//   ({ email, password }) =>
//   async (dispatch, getState) => {
//     try {
//       const user = await db.auth().signInWithEmailAndPassword(email, password);
//       console.log("user", user);
//     } catch (error) {
//       console.log("error", error);
//       console.log("error.code", error.code);
//       console.log("error.message", error.message);
//     }
//   };

// export const authSignOutUser = () => async (dispatch, getState) => {
//   await db.auth().signOut();
//   dispatch(authSignOut());
// };

// export const authStateCahngeUser = () => async (dispatch, getState) => {
//   await db.auth().onAuthStateChanged((user) => {
//     if (user) {
//       const userUpdateProfile = {
//         nickName: user.displayName,
//         userId: user.uid,
//       };

//       dispatch(authStateChange({ stateChange: true }));
//       dispatch(updateUserProfile(userUpdateProfile));
//     }
//   });
// };
