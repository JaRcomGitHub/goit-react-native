import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "./PostsScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

const NestedScreen = createStackNavigator();

const HomeScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="Posts" component={PostsScreen} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default HomeScreen;
