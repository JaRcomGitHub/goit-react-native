import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const initialState = {
  title: "",
  place: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [state, setstate] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  // const [location, setLocation] = useState(null);
  // const size = 24;
  // const color = "black";
  // const [hasPermission, setHasPermission] = useState(null);
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
  // let location = await Location.getCurrentPositionAsync({});
  // const coords = {
  //   latitude: location.coords.latitude,
  //   longitude: location.coords.longitude,
  // };
  // setLocation(coords);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      // setHasPermission2(status === "granted");
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log("latitude", location.coords.latitude);
    console.log("longitude", location.coords.longitude);
    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  const sendPhoto = () => {
    console.log("navigation", navigation);
    navigation.navigate("Posts", { photo });
    //Добавить отправку названия и координат
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 200, borderRadius: 10 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
          <Text style={styles.snap}>
            <MaterialIcons name="photo-camera" size={32} color="#fff" />
          </Text>
        </TouchableOpacity>
      </Camera>
      <View>
        <Text style={styles.inputTitle}>Название</Text>
        <TextInput
          style={styles.input}
          textAlign={"center"}
          // onFocus={() => setIsShowKeyboard(true)}
          value={state.title}
          onChangeText={(value) =>
            setstate((prevState) => ({ ...prevState, title: value }))
          }
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.inputTitle}>Местность</Text>
        <TextInput
          style={styles.input}
          textAlign={"center"}
          // onFocus={() => setIsShowKeyboard(true)}
          value={state.place}
          onChangeText={(value) =>
            setstate((prevState) => ({ ...prevState, place: value }))
          }
        />
      </View>
      <View style={{ marginLeft: 30 }}>
        <Text onPress={() => navigation.navigate("Map")}>
          <SimpleLineIcons name="location-pin" size={24} color="black" />
          Map
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
          <Text style={styles.sendLabel}>SEND</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Feather name="trash-2" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: "70%",
    // marginHorizontal: 2,
    // marginTop: 40,
    marginBottom: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  snap: {
    color: "#fff",
    opacity: 1,
  },
  snapContainer: {
    borderWidth: 1,
    // borderColor: "#ff0000",
    backgroundColor: "#fff",
    opacity: 0.33,
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#4169e1",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  sendLabel: {
    color: "#4169e1",
    fontSize: 20,
  },
  inputTitle: {
    color: "#f0f8ff",
    marginBottom: 5,
    fontSize: 18,
    fontFamily: "Roboto",
  },
});

export default CreatePostsScreen;
