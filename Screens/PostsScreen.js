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
// import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
// import { useSelector } from "react-redux";
// import { selectEmail, selectLogin } from "../src/redux/authSlice";

const initialState = {
  posts: [],
  uriPhoto: "",
  title: "",
  place: "",
  // location.coords.latitude: "",
  // location.coords.longitude: "",
};

const PostsScreen = ({ navigation, route }) => {
  // const name = useSelector(selectLogin);
  // const email = useSelector(selectEmail);
  const [posts, setPosts] = useState([]);

  console.log("route.params", route.params);

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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
            />
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
                go to Comments
                <Feather name="message-circle" size={24} color="black" />
              </TouchableOpacity>
              {/* <AntDesign name="like2" size={24} color="black" /> */}
              <TouchableOpacity onPress={() => navigation.navigate("Map")}>
                go to Map
                <SimpleLineIcons name="location-pin" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* <Button title="go to map" onPress={() => navigation.navigate("Map")} />
      <Button
        title="go to Comments"
        onPress={() => navigation.navigate("Comments")}
      /> */}

      {/* <Text>Posts:</Text> */}
      {/* <Text>Post 1</Text> */}
      {/* <View style={{ marginBottom: 60 }}>
        <Text onPress={() => navigation.navigate("Comments")}>
          go to Comments
          <Feather name="message-circle" size={24} color="black" />
        </Text>
        <AntDesign name="like2" size={24} color="black" />
        <Text onPress={() => navigation.navigate("Map")}>
          go to Map
          <SimpleLineIcons name="location-pin" size={24} color="black" />
        </Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginBottom: 100,
  },
});

export default PostsScreen;
