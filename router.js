import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
// import { Button } from "react-native";
import { logOut, selectIsAuth } from "./src/redux/authSlice";

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import HomeScreen from "./Screens/HomeScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen";
import ProfileScreen from "./Screens/ProfileScreen";

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const UseRoute = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  console.log("Route isAuth:", isAuth);

  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Публикации",
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color="#aaa"
              style={{ marginRight: 15 }}
              //   onPress={() => alert("This is a button!")}
              onPress={() => dispatch(logOut())}
            />
          ),
        }}
      />
      <MainStack.Screen name="Posts" component={PostsScreen} />
      <MainStack.Screen name="CreatePosts" component={CreatePostsScreen} />
      <MainStack.Screen name="Comments" component={CommentsScreen} />
      <MainStack.Screen name="Map" component={MapScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Navigator>
  );

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: true,
        // title: "Login Name",
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#ccc",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        // tabBarLabelStyle: { paddingBottom: 3 },
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={size} color={color} />
          ),
          title: "Публикации",
          headerRight: () => (
            // <Button
            //   onPress={() => alert("This is a button!")}
            //   title="Info"
            //   color="#fff"
            //   />
            <Feather
              name="log-out"
              size={24}
              color="black"
              style={{ marginRight: 15 }}
              onPress={() => alert("This is a button!")}
            />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={size} color={color} />
          ),
          title: "Создать публикацию",
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              color="black"
              style={{ marginLeft: 15 }}
            />
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          title: "Профиль",
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default UseRoute;
