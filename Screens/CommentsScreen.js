import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const CommentsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>CommentsScreen</Text>

      <Feather name="arrow-up" size={24} color="black" />
      <Feather name="arrow-up-circle" size={24} color="black" />
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

export default CommentsScreen;
