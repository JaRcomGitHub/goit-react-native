import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
  const size = 24;
  const color = "black";
  return (
    <View style={styles.container}>
      <Text>CreatePostsScreen</Text>

      <MaterialIcons name="photo-camera" size={24} color="black" />
      <Text onPress={() => navigation.navigate("Map")}>
        <SimpleLineIcons name="location-pin" size={24} color="black" />
        Map
      </Text>

      <Feather name="trash-2" size={24} color="black" />
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
