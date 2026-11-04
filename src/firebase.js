import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQ8K9_lCbeErq2KVXv9p2IEruThdyoOLw",
  authDomain: "indina-bynsar-wedding.firebaseapp.com",
  projectId: "indina-bynsar-wedding",
  storageBucket: "indina-bynsar-wedding.firebasestorage.app",
  messagingSenderId: "945432382814",
  appId: "1:945432382814:web:9830281e868edc873ed3cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
