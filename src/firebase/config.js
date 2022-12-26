import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8gndAWuJes3Y9J5ZWHH67tmDQs4YaFx4",
  authDomain: "react-native-jarcom.firebaseapp.com",
  projectId: "react-native-jarcom",
  storageBucket: "react-native-jarcom.appspot.com",
  messagingSenderId: "133086671079",
  appId: "1:133086671079:web:209b31114010823990f242",
  measurementId: "G-4L9KYLZV51",
};

export default firebase.initializeApp(firebaseConfig);
