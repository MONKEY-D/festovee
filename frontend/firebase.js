// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "festovee-61bd8.firebaseapp.com",
  projectId: "festovee-61bd8",
  storageBucket: "festovee-61bd8.firebasestorage.app",
  messagingSenderId: "874669470801",
  appId: "1:874669470801:web:b33ccb3df0368886edf470",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
