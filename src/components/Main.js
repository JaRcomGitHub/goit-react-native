import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { authStateChangeUser } from "../redux/authSlice";
import { selectIsAuth } from "../redux/selectors";
import useRoute from "../../router";

const Main = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [isAuth]);

  const routing = useRoute(isAuth);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
