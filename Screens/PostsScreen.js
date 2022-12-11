import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectEmail, selectLogin } from "../src/redux/authSlice";

const PostsScreen = ({ navigation }) => {
  const name = useSelector(selectLogin);
  const email = useSelector(selectEmail);

  return (
    <View style={styles.container}>
      <Text>PostsScreen</Text>

      <Text>User Photo</Text>
      <Text>{name}</Text>
      <Text>{email}</Text>

      <Text>Posts:</Text>
      <Text>Post 1</Text>
      <Text onPress={() => navigation.navigate("Comments")}>
        go to Comments
        <Feather name="message-circle" size={24} color="black" />
      </Text>
      <AntDesign name="like2" size={24} color="black" />
      <Text onPress={() => navigation.navigate("Map")}>
        go to Map
        <SimpleLineIcons name="location-pin" size={24} color="black" />
      </Text>

      <Text>Post 2</Text>
      <Text>Post ...</Text>
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

export default PostsScreen;
