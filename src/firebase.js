import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOgEWB7-Np3hbTkFtRwokupune-GXX5Ic",
  authDomain: "holiday-photos-90b03.firebaseapp.com",
  projectId: "holiday-photos-90b03",
  storageBucket: "holiday-photos-90b03.appspot.com",
  messagingSenderId: "532820975517",
  appId: "1:532820975517:web:21892005d7cd21c0c45974",
  measurementId: "G-WHLD4SYDG3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
