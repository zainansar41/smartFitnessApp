import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "@firebase/firestore";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAcPjKJ061JtDfhODb89YyMtJDpRtTW868",
  authDomain: "sprout-1d364.firebaseapp.com",
  projectId: "sprout-1d364",
  storageBucket: "sprout-1d364.firebasestorage.app",
  messagingSenderId: "286503187044",
  appId: "1:286503187044:web:68c0a0e05db6f1834e6571",
  measurementId: "G-EWRWYGWF45",
  databaseURL: "https://sprout-1d364-default-rtdb.asia-southeast1.firebasedatabase.app"
};

export const googleConfig = {
  androidClientId:
    "774303137774-h125hemm1g5g5mpil0pqq9bjv0dpjaae.apps.googleusercontent.com",
};
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getDatabase(app);
export const fireStore = getFirestore(app);
export const storage = getStorage(app);
