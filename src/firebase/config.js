// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBf-qsszwxwEBWt3HYP7lX8tccfdFPl84w",
    authDomain: "climatick-a88c3.firebaseapp.com",
    projectId: "climatick-a88c3",
    storageBucket: "climatick-a88c3.firebasestorage.app",
    messagingSenderId: "949958424259",
    appId: "1:949958424259:web:28ebff2a869273aa2b5476",
    measurementId: "G-7KVVL9VKH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
export default app