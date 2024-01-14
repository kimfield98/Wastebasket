import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-dYvAypYKup-9KM86sEOsxLrqbcj23t0",
  authDomain: "momyakson.firebaseapp.com",
  projectId: "momyakson",
  storageBucket: "momyakson.appspot.com",
  messagingSenderId: "729758685544",
  appId: "1:729758685544:web:03accfb363ebf74d081edd"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);