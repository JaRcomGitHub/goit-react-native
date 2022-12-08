
import React, { useState } from "react";
// import React, { useEffect } from "react";
// import {} from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
// import * as Font from "expo-font";
// import AppLoading from 'expo-app-loading';//import { AppLoading } from "expo";

// const loadApplication = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//   });
// };

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  // const [iasReady, setIasReady] = useState(false);

  const handlerSwitchLoginRegScr = () => {
    setIsLogin(!isLogin);
    console.log(isLogin);
  }

  // if (!iasReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadApplication}
  //       onFinish={() => setIasReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }

  return (
    <>
      {isLogin && <LoginScreen onSwitch={ handlerSwitchLoginRegScr } />}
      {!isLogin && <RegistrationScreen onSwitch={ handlerSwitchLoginRegScr } />}
    </>
  );
}


