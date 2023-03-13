// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDfmwoiYpzESanz9PBTuav6ymPPc_ie04",
  authDomain: "parrot-app-14126.firebaseapp.com",
  databaseURL: "https://parrot-app-14126-default-rtdb.firebaseio.com",
  projectId: "parrot-app-14126",
  storageBucket: "parrot-app-14126.appspot.com",
  messagingSenderId: "173834247577",
  appId: "1:173834247577:web:f3ad8e05f9b5622acd4708",
  measurementId: "G-DF8FJ88QLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const auth = 