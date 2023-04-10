// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGjcd0NJ4HqwP5qTLoMAjT6iLxyY3uDog",
    authDomain: "realstate-ac254.firebaseapp.com",
    projectId: "realstate-ac254",
    storageBucket: "realstate-ac254.appspot.com",
    messagingSenderId: "1002590552899",
    appId: "1:1002590552899:web:18159b373738851a8ba5f6",
    measurementId: "G-Q91XRQRQ5E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();