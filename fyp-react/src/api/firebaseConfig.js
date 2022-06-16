// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
  
const firebaseConfig = {
    apiKey: "AIzaSyDQj9268_Db9OyA6hNn0OoI5NWeZxKbnqA",
    authDomain: "fyp-react-1de43.firebaseapp.com",
    databaseURL: "https://fyp-react-1de43-default-rtdb.firebaseio.com",
    projectId: "fyp-react-1de43",
    storageBucket: "fyp-react-1de43.appspot.com",
    messagingSenderId: "310242155006",
    appId: "1:310242155006:web:1f8577059d2919b47548af"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  
export default db;