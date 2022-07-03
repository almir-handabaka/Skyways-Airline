import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import NavMeni from './navMeni/NavMeni'

const ProtectedRoute = ({ isAllowed, children }) => {
  const { user } = useUserAuth();

  console.log("allowed", isAllowed)
  console.log("protected user",user)

  if (!user || typeof (user.email) === 'undefined') {
    console.log("undefined")
    return <Navigate to="/" />;
  }

  if(!isAllowed.includes(user.type)) {
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

  return (
    <>
      <NavMeni />
      {children}
    </>

  );

};

export default ProtectedRoute;