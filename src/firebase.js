import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/*const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};
*/

const firebaseConfig = {

  apiKey: "AIzaSyAnDnK9ox_vhuYg5aafzfyUtpg3zLaG-Aw",

  authDomain: "dws-skyways.firebaseapp.com",

  projectId: "dws-skyways",

  storageBucket: "dws-skyways.appspot.com",

  messagingSenderId: "86170670538",

  appId: "1:86170670538:web:df579a3af70dbc0b186b33"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
