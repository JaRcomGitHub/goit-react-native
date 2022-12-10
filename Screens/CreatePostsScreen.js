import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const size = 24;
  const color = "black";
  return (
    <View style={styles.container}>
      <Text>CreatePostsScreen</Text>

      <Feather name="grid" size={size} color={color} />
      <Feather
        name="log-out"
        size={24}
        color="black"
        onPress={() => alert("This is a button!")}
      />
      <Feather name="plus" size={size} color={color} />
      <Feather name="arrow-left" size={24} color="black" />
      <Feather name="user" size={size} color={color} />

      <Feather name="arrow-up" size={24} color="black" />
      <Feather name="arrow-up-circle" size={24} color="black" />

      <Feather name="trash-2" size={24} color="black" />

      <Feather name="message-circle" size={24} color="black" />

      <SimpleLineIcons name="location-pin" size={24} color="black" />
      <MaterialIcons name="photo-camera" size={24} color="black" />
      <AntDesign name="like2" size={24} color="black" />
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

export default CreatePostsScreen;
