// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArpC9HJ46RRMM-t03uMzqaPb1mbNvvlhQ",
  authDomain: "todo-final-d37b8.firebaseapp.com",
  projectId: "todo-final-d37b8",
  storageBucket: "todo-final-d37b8.appspot.com",
  messagingSenderId: "356597631167",
  appId: "1:356597631167:web:d106f5e7aa252c471cde0a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
