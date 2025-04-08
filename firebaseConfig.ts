import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJSGvSKvNdOsVzVAHjR3NCjg-x9fL5CEU",
  authDomain: "loanapp-3f4b9.firebaseapp.com",
  projectId: "loanapp-3f4b9",
  storageBucket: "loanapp-3f4b9.firebasestorage.app",
  messagingSenderId: "1047822488824",
  appId: "1:1047822488824:web:5c7c9db1a9ae5d3e8c170d",
  measurementId: "G-PCR5NKK2TB",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
