import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "firebase/auth";
import { auth, db } from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import { collection, query, where, getDocs } from "firebase/firestore";
import NavMeni from '.././components/navMeni/NavMeni'


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({}); // save token inside user state (?)

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    console.log("odjava")
    return signOut(auth);
  }


  useEffect(() => {
    const getAuth = async () => {
      let tmp_user;
      onAuthStateChanged(auth, async (currentuser) => {
      
      tmp_user = currentuser;
      const q = query(collection(db, "users"), where("email", "==", tmp_user.email));

      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        setUser({ ...doc.data() });
        console.log("setan user")
        });
      });
    }

    return () => {
      getAuth();
    };
  }, [])



  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}