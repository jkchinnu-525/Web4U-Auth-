// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "web4u-64646.firebaseapp.com",
  projectId: "web4u-64646",
  storageBucket: "web4u-64646.appspot.com",
  messagingSenderId: "398552516026",
  appId: "1:398552516026:web:4a67bf55224fb4d4a88983"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);