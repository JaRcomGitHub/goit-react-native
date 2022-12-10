import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
// import { Button } from "react-native";
import { logOut, selectIsAuth } from "./src/redux/authSlice";

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
// import HomeScreen from "./Screens/HomeScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen";
import ProfileScreen from "./Screens/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const CreatePostsStack = createStackNavigator();

function CreatePostsStackScreen() {
  return (
    <CreatePostsStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <CreatePostsStack.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
          title: "Создать публикацию",
        }}
      />
      <CreatePostsStack.Screen name="Comments" component={CommentsScreen} />
      <CreatePostsStack.Screen name="Map" component={MapScreen} />
    </CreatePostsStack.Navigator>
  );
}

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
  //Home:
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        // headerShown: true,
        headerStyle: {
          backgroundColor: "#fff",
        },
        // headerTintColor: "#ccc",
        // headerTitleStyle: {
        //   fontWeight: "bold",
        // },
        headerTitleAlign: "center",
        // tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#4169e1",
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={size} color={color} />
          ),
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
          showIcon: "false",
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={size} color={color} />
          ),
          headerShown: false,
        }}
        name="CreatePosts"
        component={CreatePostsStackScreen}
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
      {/* <MainTab.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          title: "Комментарии",
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "tomato",
          tabBarBadge: 3,
        }}
      />
      <MainTab.Screen name="Map" component={MapScreen} /> */}
    </MainTab.Navigator>
  );
};

export default UseRoute;
