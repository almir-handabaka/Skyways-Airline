import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import NavMeni from './navMeni/NavMeni'
import { Navigate } from "react-router-dom";
/*
1. da li je loginan
2. da li se radi o pocetnoj ruti
3. ako je loginan provjeravamo da li ide na auth rutu
4. ako nije loginan provjeravamo da li ide na pocetnu i pustamo ga

*/



const ProtectedRoute = ({ isAllowed, children }) => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  
  console.log("allowed", isAllowed)
  console.log("protected user",user.email)


  const ruta = window.location.pathname;
  const pocetna_ruta = (ruta === '/' || ruta === '/signup');
  const authenticated = !(!user || typeof (user.email) === 'undefined')

  console.log("1")
  if (!authenticated && !pocetna_ruta) {
    console.log("undefined")
    return <Navigate to="/" />;
    
  }

  else if (authenticated && pocetna_ruta) {
    console.log("already sign in")
    switch(user.type){
      case 'administrator':
        return <Navigate to="/administrator" />;
        break;
      case 'employee':
        return <Navigate to="/radnik" />;
        break;
      case 'user':
        return <Navigate to="/korisnik" />;
        break;
    }
  }

  else if(authenticated && !isAllowed.includes(user.type)) {
    console.log("not allowed")
    switch(user.type){
      case 'administrator':
        return <Navigate to="/administrator" />;
        break;
      case 'employee':
        return <Navigate to="/radnik" />;
        break;
      case 'user':
        return <Navigate to="/korisnik" />;
        break;
    }
  }
  else {
    return (
      <>
        <NavMeni />
        {children}
      </>

    );
  }
};

export default ProtectedRoute;