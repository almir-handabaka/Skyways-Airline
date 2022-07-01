import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import NavMeni from './navMeni/NavMeni'

const ProtectedRoute = ({ isAllowed, children }) => {
  // auth goes here
  // if user isn't auth, redirect to / route, else if user doesn't have access to that route redirect to his default /home page, else return children
  // check route acess inside the route
  const { user } = useUserAuth();

  console.log("allowed", isAllowed)
  console.log(user)

  if (!user || typeof (user.email) === 'undefined') {
    return <Navigate to="/" />;
  }

  if(!isAllowed.includes(user.type)) {
    return <Navigate to="/" />;
    switch(user.type){
      case 'administrator':
        return <Navigate to="/" />;
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