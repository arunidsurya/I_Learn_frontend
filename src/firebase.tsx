// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-learning-72a45.firebaseapp.com",
  projectId: "e-learning-72a45",
  storageBucket: "e-learning-72a45.appspot.com",
  messagingSenderId: "1037893838444",
  appId: "1:1037893838444:web:d512f9f4171ded2670da49",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
