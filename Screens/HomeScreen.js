import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../src/redux/authSlice";

const HomeScreen = ({ navigation }) => {
  const isAuth = useSelector(selectIsAuth);

  console.log("Home isAuth:", isAuth);

  if (!isAuth) {
    // navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      {/* {login && <Text>login: {login}</Text>}
      {email && <Text>email: {email}</Text>}
      {password && <Text>password: {password}</Text>} */}
      <Text
        onPress={() =>
          navigation.navigate("Home", {
            screen: "Posts",
            params: { userId: "e2ee4" },
          })
        }
      >
        TEST
      </Text>
      <Text onPress={() => navigation.navigate("Posts")}>go to Posts</Text>
      <Text onPress={() => navigation.navigate("CreatePosts")}>
        go to CreatePosts
      </Text>
      <Text onPress={() => navigation.navigate("Comments")}>
        go to Comments
      </Text>
      <Text onPress={() => navigation.navigate("Map")}>go to Map</Text>
      <Text onPress={() => navigation.navigate("Profile")}>go to Profile</Text>
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

export default HomeScreen;
