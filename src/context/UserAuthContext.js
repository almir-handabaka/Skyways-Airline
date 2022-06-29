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
    return signOut(auth);
  }


  /*
    const JWTOken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsInNvbWUiOiJ0ZXN0In0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.tgNRTVg7N7iGW6HI4TJhMsaI0EAuz6bTvFuCO_bfD9wtuAKU2QtxZegRKJdJhDsUM2BNbLGQWcS1gAr4UtURurHtwPPzsDp89DoeHRyxE9Joja55xAytrDPlmBaEJwMYMLOEDJDp3-d7EdFes94wO0WFj4Xfighp3G9UphQ-38OcxpKI8jqJcSb5ea5UGWD9vRyuADeqao4KqCS5XdQJkLvp7-6jwgqTpyIOVBaW36tW-Jbz4HJrqh2lDitIQL74OpCgJyN9u76vgwVn24B8SY3s1uklF2McoBMAUXK7g9JZ__8IJ3rkOHfnhICnutmJpONbd_JKf7DJQqOd7uDGCg";
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  */

  console.log("auth context")

  useEffect(() => {
    const getAuth = async () => {
      let tmp_user;
      onAuthStateChanged(auth, async (currentuser) => {
      
      tmp_user = currentuser;
      //setUser(currentuser);
      const q = query(collection(db, "users"), where("email", "==", tmp_user.email));

      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("doc.data().email")
        console.log(doc.id, " => ", doc.data());
        setUser({ ...doc.data() });
        
        

        });
      });
    }

    return () => {
      getAuth();
    };
  }, [])


  /*useEffect(() => {
    let tmp_user;
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      tmp_user = currentuser;
      //setUser(currentuser);
      const q = query(collection(db, "users"), where("email", "==", tmp_user.email));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        setUser({ ...user, myId: doc.data().id, tickets: doc.data().tickets, type: doc.data().type });

      });
    });

    return () => {
      unsubscribe();

    };
  }, []);*/


  /*useEffect(() => {
    let tmp_user;
    const unsubscribe = async () => {
      const q = query(collection(db, "users"), where("email", "==", "almir.handabaka@gmail.com"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        setUser({ ...user, myId: doc.data().id, tickets: doc.data().tickets, type: doc.data().type });

      });

      //console.log(user);
    }

    return () => {
      unsubscribe();

    };
  }, []);*/


  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut }}
    >
      
      {<NavMeni />}
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}