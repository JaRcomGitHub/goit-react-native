import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
// import { Feather } from "@expo/vector-icons";
// import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const initialInfo = {
  title: "",
  place: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [info, setInfo] = useState(initialInfo);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  // const size = 24;
  // const color = "black";
  // const [hasPermission, setHasPermission] = useState(null);
  // const [hasPermission, setHasPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      // setHasPermission(status === "granted");
      if (status !== "granted") {
        console.log("Permission to access Camera was denied");
      }
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      // setHasPermission2(status === "granted");
      if (status !== "granted") {
        console.log("Permission to access Location was denied");
      }
    })();
  }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      const photoLocation = await Location.getCurrentPositionAsync();
      setPhoto(photo.uri);
      setLocation(photoLocation.coords);
      // console.log("photo", photo);
    }
  };

  const sendPhoto = () => {
    // console.log("navigation", navigation);
    navigation.navigate("Posts", { photo, location, info });
    setInfo(initialInfo);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
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
      <View style={{ marginTop: 5 }}>
        <TextInput
          style={styles.input}
          textAlign={"left"}
          // onFocus={() => setIsShowKeyboard(true)}
          placeholder="Название..."
          value={info.title}
          onChangeText={(value) =>
            setInfo((prevState) => ({ ...prevState, title: value }))
          }
        />
      </View>
      <View style={{ marginTop: 5 }}>
        <TextInput
          style={styles.input}
          textAlign={"left"}
          // onFocus={() => setIsShowKeyboard(true)}
          placeholder="Местность..."
          value={info.place}
          onChangeText={(value) =>
            setInfo((prevState) => ({ ...prevState, place: value }))
          }
        />
      </View>
      {/* <View>
        <Text onPress={() => navigation.navigate("Map", { location })}>
          <SimpleLineIcons name="location-pin" size={24} color="black" />
        </Text>
      </View> */}
      <View style={{ marginTop: 5 }}>
        <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
          <Text style={styles.sendLabel}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{ marginTop: 5, alignItems: "center" }}>
        <TouchableOpacity style={styles.deleteBtn}>
          <Feather name="trash-2" size={24} color="black" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  camera: {
    height: "70%",
    // marginHorizontal: 2,
    // marginTop: 40,
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
    top: 20,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
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
  deleteBtn: {
    padding: 5,
    width: 70,
    borderRadius: 50,
    backgroundColor: "#d3d3d3",
    alignItems: "center",
  },
});

export default CreatePostsScreen;
