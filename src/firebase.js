import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA942tSmy8duRCH6DlIUJt7IJ9-5nbPrKQ",
  authDomain: "chat-web-ap.firebaseapp.com",
  projectId: "chat-web-ap",
  storageBucket: "chat-web-ap.appspot.com",
  messagingSenderId: "1062674749462",
  appId: "1:1062674749462:web:36fa9b24232b5b49fb7d37",
  measurementId: "G-YCCJ5VQ8XP"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, serverTimestamp };
