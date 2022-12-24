import React from "react";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { authSignOutUser } from "./src/redux/authSlice";

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen";
import ProfileScreen from "./Screens/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const CreatePostsStack = createStackNavigator();
const PostsStack = createStackNavigator();

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
              onPress={() => dispatch(authSignOutUser())}
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

const useRoute = (isAuth) => {
  if (!isAuth) {
    return <AuthStackScreen />;
  }
  return <MainTabHomeScreen />;
};

export default useRoute;
