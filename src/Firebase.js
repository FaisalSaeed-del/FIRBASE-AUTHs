import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAI3XzoPjjigMjKbnLb-wKkhKDL5QSrruc",
  authDomain: "book-store-ae31d.firebaseapp.com",
  projectId: "book-store-ae31d",
  storageBucket: "book-store-ae31d.appspot.com",
  messagingSenderId: "110260044851",
  appId: "1:110260044851:web:72748227a2968c0f3f4f46",
  measurementId: "G-WLZWQCP1DW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export { app };