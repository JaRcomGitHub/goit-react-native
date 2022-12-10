import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../src/redux/authSlice";

const HomeScreen = ({ navigation }) => {
  const isAuth = useSelector(selectIsAuth);

  console.log("Home isAuth:", isAuth);

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
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
