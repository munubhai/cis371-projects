// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDFBZ54kEcHIfjOWLTf4rfcJPFNtSagd2Y",
  authDomain: "firestore-be780.firebaseapp.com",
  projectId: "firestore-be780",
  storageBucket: "firestore-be780.appspot.com",
  messagingSenderId: "315813940395",
  appId: "1:315813940395:web:b0f966014c05730d00fbee",
  measurementId: "G-W1S9HPHMPR"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export {firebaseConfig, app};