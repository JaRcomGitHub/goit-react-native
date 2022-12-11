import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
// import { Button } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { logOut, selectIsAuth } from "./src/redux/authSlice";

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
// import HomeScreen from "./Screens/HomeScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen";
import ProfileScreen from "./Screens/ProfileScreen";

// const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const CreatePostsStack = createStackNavigator();
const PostsStack = createStackNavigator();

// function MainStackScreen() {
//   return (
//     <MainStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <MainStack.Screen name="Home" component={MainTabHomeScreen} />
//       <MainStack.Screen
//         name="CreatePostOnly"
//         component={CreatePostsStackScreen}
//       />
//     </MainStack.Navigator>
//   );
// }

// function CreateScreen({ navigation }) {
//   // const [isCreate, setIsCreate] = useState(true);
//   console.log("test0");
//   useEffect(() => {
//     console.log("test1");
//     navigation.navigate("CreatePostOnly");
//     return () => {
//       console.log("test2");
//       navigation.navigate("MainTabHomeScreen");
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>CreateScreen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

function AuthStackScreen() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Registration" component={RegistrationScreen} />
    </AuthStack.Navigator>
  );
}

function CreatePostsStackScreen({ navigation }) {
  return (
    <CreatePostsStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <CreatePostsStack.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Создать публикацию",
        }}
      />
      <CreatePostsStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
        }}
      />
    </CreatePostsStack.Navigator>
  );
}

function PostsStackScreen() {
  const dispatch = useDispatch();
  return (
    <PostsStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <PostsStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публикации",
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color="#aaa"
              style={{ marginRight: 15 }}
              onPress={() => dispatch(logOut())}
            />
          ),
        }}
      />
      <PostsStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
        }}
      />
      <PostsStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
        }}
      />
    </PostsStack.Navigator>
  );
}

function MainTabHomeScreen() {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#4169e1",
        tabBarStyle: { position: "absolute" },
      }}
    >
      <MainTab.Screen
        name="PostsStack"
        component={PostsStackScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={size} color={color} />
          ),
          title: "Публикации",
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="CreatePostsStack"
        component={CreatePostsStackScreen}
        // component={CreateScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={size} color={color} />
          ),
          title: "Создать публикацию",
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          title: "Профиль",
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
}

const UseRoute = () => {
  const isAuth = useSelector(selectIsAuth);

  console.log("Route isAuth:", isAuth);

  if (!isAuth) {
    return <AuthStackScreen />;
  }

  // return <CreatePostsStackScreen />;

  return <MainTabHomeScreen />;

  // return <MainStackScreen />;
};

export default UseRoute;
