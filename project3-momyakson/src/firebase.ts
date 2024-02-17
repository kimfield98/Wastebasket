import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5mHFtjw19VqPHDhyN04jtkWr1md_r58Y",
  authDomain: "momyakson-c3137.firebaseapp.com",
  projectId: "momyakson-c3137",
  storageBucket: "momyakson-c3137.appspot.com",
  messagingSenderId: "775780982794",
  appId: "1:775780982794:web:48328914bd22c3eaedfff3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);