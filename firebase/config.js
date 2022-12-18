// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8gndAWuJes3Y9J5ZWHH67tmDQs4YaFx4",
  authDomain: "react-native-jarcom.firebaseapp.com",
  projectId: "react-native-jarcom",
  storageBucket: "react-native-jarcom.appspot.com",
  messagingSenderId: "133086671079",
  appId: "1:133086671079:web:209b31114010823990f242",
  measurementId: "G-4L9KYLZV51",
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
