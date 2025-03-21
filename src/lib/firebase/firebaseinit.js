// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu43vPWLL3zT0BtMLgloYCCRLm79T2x3k",
  authDomain: "digi-ktav.firebaseapp.com",
  projectId: "digi-ktav",
  storageBucket: "digi-ktav.firebasestorage.app",
  messagingSenderId: "313199249994",
  appId: "1:313199249994:web:c97967028b40d4ba3474b3",
  measurementId: "G-N7JSFPM4FG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);