
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { initializeApp } from "firebase/compat/app";

const firebaseConfig = {
    apiKey: "AIzaSyD8q_BzcLKDJQv8_az8C3uZvZ-R5B3kqm4",
    authDomain: "realstate-d9def.firebaseapp.com",
    projectId: "realstate-d9def",
    storageBucket: "realstate-d9def.appspot.com",
    messagingSenderId: "789202840133",
    appId: "1:789202840133:web:ee9dce2de04deb1db1512c",
    measurementId: "G-PTFGYD7M2C"
  };

  let app;

  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }
  
  const db = app.firestore();
  const auth = firebase.auth();
  // const storage = firebase.storage();
  // const storageRef = storage.ref();
  
  export { db, auth };
