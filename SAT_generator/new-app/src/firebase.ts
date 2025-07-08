import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAeM6HUfFnHGFM9rh1M_Y1wKZaM2nN2SIY",
  authDomain: "sat-generation.firebaseapp.com",
  projectId: "sat-generation",
  storageBucket: "sat-generation.appspot.com", 
  messagingSenderId: "836625315275",
  appId: "1:836625315275:web:3f6a5d468580e5b38f724e",
  measurementId: "G-TFJ2BQLPPJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export { app, auth };
