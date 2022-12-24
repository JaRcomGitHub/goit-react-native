import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  logOut,
  selectEmail,
  selectLogin,
  authSignOutUser,
} from "../src/redux/authSlice";
// import { AntDesign } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const name = useSelector(selectLogin);
  const email = useSelector(selectEmail);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Text>User Photo</Text>
      <Text>{name}</Text>
      <Text>{email}</Text>
      <Feather
        name="log-out"
        size={24}
        color="#aaa"
        style={{ marginRight: 15 }}
        onPress={() => dispatch(authSignOutUser())}
      />
      <Text>Posts:</Text>
      {/* <AntDesign name="like2" size={24} color="black" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
