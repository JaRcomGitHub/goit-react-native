import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  // Dimensions,
} from "react-native";
import { regIn, selectIsAuth } from "../src/redux/authSlice";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  console.log("Regis isAuth:", isAuth);

  // const [dimensions, setdimensions] = useState(
  //   Math.round(Dimensions.get("window").width - 20 * 2)
  // );

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Math.round(Dimensions.get("window").width - 20 * 2);

  //     setdimensions(width);
  //   };
  //   Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     Dimensions.removeEventListener("change", onChange);
  //   };
  // }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handlerOnSubmit = () => {
    keyboardHide();
    console.log(state);
    dispatch(regIn(state));
    setstate(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/3d-render-tree-landscape-against-night-sky.jpg")}
        >
          <KeyboardAvoidingView
            // behavior={Platform.OS == "ios" ? "padding" : "height"}
            behavior={Platform.OS == "ios" && "padding"}
          >
            <View
              style={{
                ...styles.form,
                // marginBottom: isShowKeyboard ? 20 : 150,
                // width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Регистрация</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Логин</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.inputTitle}>Адрес электронной почты</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.inputTitle}>Пароль</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={handlerOnSubmit}
              >
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>

              {/* <View style={{ alignItems: "center", marginTop: 10 }}>
                <Text style={styles.switchTitle} onPress={onSwitch}>
                  Уже есть аккаунт? Войти
                </Text>
              </View> */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                }}
              >
                <Text style={{ color: "#fff" }}>
                  Уже есть аккаунт?{" "}
                  <Text style={{ fontSize: 18, color: "#ff6347" }}>Войти</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f0f8ff",
    height: 40,
    borderRadius: 6,

    color: "#f0f8ff",
  },
  form: {
    marginHorizontal: 40,
  },
  inputTitle: {
    color: "#f0f8ff",
    marginBottom: 5,
    fontSize: 18,
    fontFamily: "Roboto",
  },
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    height: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#4169e1",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#f0f8ff",
    fontSize: 18,
    fontFamily: "Roboto",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 40,
    color: "#f0f8ff",
    fontFamily: "Roboto",
  },
  switchTitle: {
    fontSize: 18,
    color: "#f0f8ff",
    fontFamily: "Roboto",
  },
});
