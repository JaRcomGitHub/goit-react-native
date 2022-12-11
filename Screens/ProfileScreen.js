import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { logOut, selectEmail, selectLogin } from "../src/redux/authSlice";

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
        onPress={() => dispatch(logOut())}
      />
      <Text>Posts:</Text>
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
