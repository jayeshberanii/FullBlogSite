// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdfVfmtv782NtYAjJdSX1bl1LB9Z7hKrw",
  authDomain: "blog-site-jayesh.firebaseapp.com",
  projectId: "blog-site-jayesh",
  storageBucket: "blog-site-jayesh.appspot.com",
  messagingSenderId: "766483229314",
  appId: "1:766483229314:web:d76ceb424b6d11ccc5e29b",
  measurementId: "G-K5JBEJJ8SH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app)