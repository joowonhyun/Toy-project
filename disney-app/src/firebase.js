// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd3NAug06j4K1OVC6B7Suml4lPAUG7VfI",
  authDomain: "react-disney-plus-app-9083e.firebaseapp.com",
  projectId: "react-disney-plus-app-9083e",
  storageBucket: "react-disney-plus-app-9083e.appspot.com",
  messagingSenderId: "489226771649",
  appId: "1:489226771649:web:a47c19c907fc8e21d44840"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;