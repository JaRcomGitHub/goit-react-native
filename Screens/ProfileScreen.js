import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  selectEmail,
  selectLogin,
  selectUid,
  authSignOutUser,
} from "../src/redux/authSlice";
// import { AntDesign } from "@expo/vector-icons";
import db from "../src/firebase/config";

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const name = useSelector(selectLogin);
  const email = useSelector(selectEmail);
  const uid = useSelector(selectUid);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("uid", "==", uid)
      .onSnapshot((data) => {
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })));
        console.log("posts tyt", data);
      });
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      {/* <Text>ProfileScreen</Text> */}
      {/* <Text>User Photo</Text> */}
      <Text>{name}</Text>
      <Text>{email}</Text>
      <TouchableOpacity onPress={signOut} style={styles.btnContainer}>
        <Text>signOut</Text>
        <Feather
          name="log-out"
          size={24}
          color="#aaa"
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
      <View>
        <FlatList
          data={userPosts}
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
            </View>
          )}
        />
      </View>
      {/* <AntDesign name="like2" size={24} color="black" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 90,
  },
  btnContainer: {
    flexDirection: "row",
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 2,
    borderColor: "#4169e1",
    borderRadius: 50,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
