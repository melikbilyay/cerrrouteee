// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import 'firebase/firestore';
import {getFirestore} from "firebase/firestore"; // If using Firestore

const firebaseConfig = {
    apiKey: "AIzaSyAatkhiM4uBRLPNgMJbFpYQp1x9ewaNEyc",
    authDomain: "cerroute.firebaseapp.com",
    projectId: "cerroute",
    storageBucket: "cerroute.appspot.com",
    messagingSenderId: "102339057716",
    appId: "1:102339057716:web:892a19a0c4844db975d261",
    measurementId: "G-7NKB9ZTDT7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)

export { auth, googleProvider };
