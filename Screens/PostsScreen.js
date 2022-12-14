import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
// import { useSelector } from "react-redux";
// import { selectEmail, selectLogin } from "../src/redux/authSlice";

const PostsScreen = ({ navigation, route }) => {
  // const name = useSelector(selectLogin);
  // const email = useSelector(selectEmail);
  const [posts, setPosts] = useState([]);

  // console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log("posts", posts);

  return (
    <View style={styles.container}>
      {/* <Text>User Photo</Text>
      <Text>{name}</Text>
      <Text>{email}</Text> */}

      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <View
              style={{
                marginHorizontal: 20,
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.photo }}
                style={{ width: "100%", height: 250, borderRadius: 10 }}
              />
            </View>
            <View
              style={{
                marginHorizontal: 20,
              }}
            >
              <Text style={styles.nameText}>{item.info.title}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginTop: 5,
              }}
            >
              <TouchableOpacity
                style={styles.touchableBtn}
                onPress={() => navigation.navigate("Comments")}
              >
                <Feather name="message-circle" size={24} color="black" />
                <Text style={styles.touchableText}>Comments</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableBtn}
                onPress={() => {
                  const location = item.location;
                  navigation.navigate("Map", { location });
                }}
              >
                <SimpleLineIcons name="location-pin" size={24} color="black" />
                <Text
                  style={{
                    ...styles.touchableText,
                    textDecorationLines: "underline",
                  }}
                >
                  {item.info.place}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 50,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  touchableBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  touchableText: {
    fontSize: 16,
    fontFamily: "Roboto",
  },
});

export default PostsScreen;
