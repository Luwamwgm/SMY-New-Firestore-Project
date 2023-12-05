// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaMgO3i9_EBZUHOSy33_6CMObhBGDkJ_8",
  authDomain: "projectfinal-21.firebaseapp.com",
  projectId: "projectfinal-21",
  storageBucket: "projectfinal-21.appspot.com",
  messagingSenderId: "371441726907",
  appId: "1:371441726907:web:75bb91d132155ad540409e",
  measurementId: "G-6HY45YMNG6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const firestore=getFirestore(app);

export const storage=getStorage(app);
export const firebaseAuth = getAuth(app);
export const firestore = getFirestore(app);
export default app;
