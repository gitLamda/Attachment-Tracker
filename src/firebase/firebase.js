// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa7vBoQi1eWVZz3ZHFiz2Vz4z26DCbOoM",
  authDomain: "attachment-tracker-dcf02.firebaseapp.com",
  projectId: "attachment-tracker-dcf02",
  storageBucket: "attachment-tracker-dcf02.firebasestorage.app",
  messagingSenderId: "979666305047",
  appId: "1:979666305047:web:52c178b88140f514d6dc52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };