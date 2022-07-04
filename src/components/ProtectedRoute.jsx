import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import NavMeni from './navMeni/NavMeni'
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ isAllowed, children }) => {
  const { user } = useUserAuth();
  
  const ruta = window.location.pathname;
  const pocetna_ruta = (ruta === '/' || ruta === '/signup');
  const authenticated = !(!user || typeof (user.email) === 'undefined')


  if (!authenticated && !pocetna_ruta) {
    return <Navigate to="/" />;
  }

  else if (authenticated && pocetna_ruta) {
    switch(user.type){
      case 'administrator':
        return <Navigate to="/administrator" />;
      case 'employee':
        return <Navigate to="/radnik" />;
      case 'user':
        return <Navigate to="/korisnik" />;
      default:
        return <Navigate to="/" />;
    }
  }

  else if(authenticated && !isAllowed.includes(user.type)) {
    switch(user.type){
      case 'administrator':
        return <Navigate to="/administrator" />;
      case 'employee':
        return <Navigate to="/radnik" />;
      case 'user':
        return <Navigate to="/korisnik" />;
      default:
        return <Navigate to="/" />;
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