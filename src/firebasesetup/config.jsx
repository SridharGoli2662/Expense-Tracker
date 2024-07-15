// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,onAuthStateChanged} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv8FC-xLmaT46mW78MiLBg4DP8OYK8fXw",
  authDomain: "expensetracker-12b64.firebaseapp.com",
  projectId: "expensetracker-12b64",
  storageBucket: "expensetracker-12b64.appspot.com",
  messagingSenderId: "794040007572",
  appId: "1:794040007572:web:7e6f3c86c8b0e288b36d81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
export {auth,onAuthStateChanged,db};