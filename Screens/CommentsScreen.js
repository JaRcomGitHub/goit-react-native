import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { selectLogin } from "../src/redux/authSlice";
// import { Feather } from "@expo/vector-icons";
import db from "../src/firebase/config";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const login = useSelector(selectLogin);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, login });
    setComment("");
  };

  const getAllPosts = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.login}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>

      <View style={{ marginTop: 5 }}>
        <TextInput
          style={styles.input}
          textAlign={"left"}
          placeholder="Комментировать..."
          value={comment}
          onChangeText={setComment}
        />
      </View>
      <View style={{ marginTop: 5, marginBottom: 50 }}>
        <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
          <Text style={styles.sendLabel}>Опубликовать</Text>
        </TouchableOpacity>
      </View>

      {/* <Feather name="arrow-up" size={24} color="black" />
      <Feather name="arrow-up-circle" size={24} color="black" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  commentContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#4169e1",
  },
  sendBtn: {
    marginHorizontal: 20,
    height: 40,
    borderWidth: 2,
    borderColor: "#4169e1",
    borderRadius: 50,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  sendLabel: {
    color: "#4169e1",
    fontSize: 20,
    fontFamily: "Roboto",
  },
  input: {
    marginHorizontal: 20,
    padding: 1,
    borderBottomWidth: 1,
    borderColor: "#778899",
    // height: 30,
    // color: "#4169e1",
    fontSize: 18,
    fontFamily: "Roboto",
  },
});

export default CommentsScreen;
